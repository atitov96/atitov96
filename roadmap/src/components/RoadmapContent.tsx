"use client";
import { useEffect, useState } from "react";
import { Resource, RoadmapItem, RoadmapTopic } from "@/types/roadmap";
import { CheckCircle2, Circle, Clock, XCircle } from "lucide-react";
import { roadmaps } from "@/data/roadmaps";
import { analytics } from "@/utils/analytics";
import { useUser } from "@/hooks/useUser";

const StatusIcon = ({ status }: { status?: string }) => {
  switch (status) {
    case "done":
      return <CheckCircle2 className="text-green-600 w-5 h-5" />;
    case "in-progress":
      return <Clock className="text-yellow-600 w-5 h-5" />;
    case "skip":
      return <XCircle className="text-gray-600 w-5 h-5" />;
    default:
      return <Circle className="text-blue-600 w-5 h-5" />;
  }
};

const StatusButton = ({
  status,
  onChange,
}: {
  status?: string;
  onChange: (status: string | undefined) => void;
}) => {
  const getStatusStyles = (currentStatus?: string) => {
    switch (currentStatus) {
      case "done":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "skip":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-blue-50 text-blue-800 hover:bg-blue-100";
    }
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${getStatusStyles(status)}`}
        onClick={() => {
          const newStatus = !status
            ? "done"
            : status === "done"
              ? "in-progress"
              : status === "in-progress"
                ? "skip"
                : undefined;
          onChange(newStatus);
        }}
      >
        <StatusIcon status={status} />
        <span className="font-medium">{status || "Pending"}</span>
      </button>
    </div>
  );
};

interface Props {
  type: string;
  telegramUser?: unknown;
}

export default function RoadmapContent({ type }: Props) {
  const [roadmap] = useState<RoadmapTopic | null>(roadmaps[type] || null);
  const [statuses, setStatuses] = useState<Record<string, string | undefined>>(
    () => {
      return {};
    },
  );
  const { user } = useUser();

  useEffect(() => {
    analytics.trackRoadmapView(type, roadmap?.title || "");
  }, [type, roadmap]);

  useEffect(() => {
    let lastScrollPercentage = 0;
    const startTime = Date.now();

    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window?.innerHeight;
      const scrolled = window?.scrollY;
      const percentage = Math.round((scrolled / scrollHeight) * 100);

      if (percentage >= 25 && lastScrollPercentage < 25) {
        analytics.trackScrollDepth(25, type);
      } else if (percentage >= 50 && lastScrollPercentage < 50) {
        analytics.trackScrollDepth(50, type);
      } else if (percentage >= 75 && lastScrollPercentage < 75) {
        analytics.trackScrollDepth(75, type);
      } else if (percentage >= 90 && lastScrollPercentage < 90) {
        analytics.trackScrollDepth(90, type);
      }

      lastScrollPercentage = percentage;
    };

    const timeInterval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      analytics.trackTimeOnPage(timeSpent, type);
    }, 60000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timeInterval);
    };
  }, [type]);

  if (!roadmap) return <div>Loading...</div>;

  const handleStatusChange = (
    itemId: string,
    newStatus: string | undefined,
  ) => {
    const userId = (user?.id ?? "anonymous").toString();

    setStatuses((prev) => {
      const updated = { ...prev };

      const findItemAndChildren = (items: RoadmapItem[]): string[] => {
        const ids: string[] = [];
        for (const item of items) {
          if (item.id === itemId) {
            ids.push(item.id);
            if (item.children) {
              item.children.forEach((child) => ids.push(child.id));
            }
            break;
          } else if (item.children) {
            ids.push(...findItemAndChildren(item.children));
          }
        }
        return ids;
      };

      const affectedIds = findItemAndChildren(roadmap?.items || []);
      affectedIds.forEach((id) => {
        updated[id] = newStatus;
      });

      const updateParentStatus = (items: RoadmapItem[]) => {
        for (const item of items) {
          if (item.children) {
            const allChildrenDone = item.children.every(
              (child) => updated[child.id] === newStatus,
            );
            if (allChildrenDone) {
              updated[item.id] = newStatus;
            }
            updateParentStatus(item.children);
          }
        }
      };

      updateParentStatus(roadmap?.items || []);

      analytics.trackItemStatusChange(type, itemId, newStatus || "", userId);

      return updated;
    });
  };

  const calculateProgress = () => {
    if (!roadmap) return 0;

    const getAllItems = (items: RoadmapItem[]): number => {
      return items.reduce((acc, item) => {
        return acc + 1 + (item.children?.length || 0);
      }, 0);
    };

    const getCompletedItems = (items: RoadmapItem[]): number => {
      return items.reduce((acc, item) => {
        const itemDone = statuses[item.id] === "done" ? 1 : 0;
        const childrenDone =
          item.children?.reduce(
            (sum, child) => sum + (statuses[child.id] === "done" ? 1 : 0),
            0,
          ) || 0;
        return acc + itemDone + childrenDone;
      }, 0);
    };

    const total = getAllItems(roadmap.items);
    const completed = getCompletedItems(roadmap.items);

    return total ? Math.round((completed / total) * 100) : 0;
  };

  const handleResourceClick = (itemId: string, resource: Resource) => {
    analytics.trackResourceClick(type, itemId, resource.url, resource.type);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {roadmap.title}
          </h1>
          <p className="text-gray-600">{roadmap.description}</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {roadmap.title}
            </h1>
            <div className="text-right">
              {/* <div className="text-sm text-gray-600">Общий прогресс</div> */}
              <div className="text-2xl font-bold text-blue-600">
                {calculateProgress()}%
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-6">
          {roadmap.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>
                <StatusButton
                  status={statuses[item.id]}
                  onChange={(newStatus) =>
                    handleStatusChange(item.id, newStatus)
                  }
                />
              </div>

              {item.children?.map((child) => (
                <div
                  key={child.id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 border-b border-gray-100"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{child.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {child.description}
                    </p>
                  </div>
                  <StatusButton
                    status={statuses[child.id]}
                    onChange={(newStatus) =>
                      handleStatusChange(child.id, newStatus)
                    }
                  />
                </div>
              ))}

              {item.resources.length > 0 && (
                <div className="bg-gray-50 p-4">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Материалы для изучения:
                  </h4>
                  <div className="space-y-2">
                    {item.resources.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        onClick={() => handleResourceClick(item.id, resource)}
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <span
                          className={`
                        inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mr-2
                        ${resource.badge === "Official" ? "bg-blue-100 text-blue-800" : ""}
                        ${resource.badge === "Article" ? "bg-green-100 text-green-800" : ""}
                        ${resource.badge === "Video" ? "bg-red-100 text-red-800" : ""}
                      `}
                        >
                          {resource.badge}
                        </span>
                        {resource.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Next Step */}
        {/* {roadmap.next && (
        <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Готовы двигаться дальше?</h3>
              <p className="text-gray-600 mt-1">
                Переходите к следующему этапу вашего обучения
              </p>
            </div>
            <Link
              href={`/${roadmap.next}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Изучить {roadmaps[roadmap.next]?.title ?? ''}
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )} */}
      </div>
    </div>
  );
}
