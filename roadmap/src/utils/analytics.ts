export interface AnalyticsEvent {
  event: string;
  [key: string]: unknown;
}

type EventProperties = Record<string, string | number | boolean>;
export type EventCallback = (name: string, properties: EventProperties) => void;

class AnalyticsService {
  private readonly YM_ID = 99090271;

  sendEvent(name: string, properties: EventProperties) {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(this.YM_ID, "reachGoal", {
        event: name,
        ...properties,
      });
    }
  }

  trackRoadmapView(roadmapId: string, title: string) {
    this.sendEvent("roadmap_view", {
      roadmap_id: roadmapId,
      title: title,
      url: typeof window !== "undefined" ? window.location.pathname : "",
    });
  }

  trackProgress(roadmapId: string, progress: number, userId: string) {
    this.sendEvent("roadmap_progress", {
      roadmap_id: roadmapId,
      progress: progress,
      user_id: userId,
    });
  }

  trackItemStatusChange(
    roadmapId: string,
    itemId: string,
    status: string,
    userId: string,
  ) {
    this.sendEvent("item_status_change", {
      roadmap_id: roadmapId,
      item_id: itemId,
      status: status,
      user_id: userId,
    });
  }

  trackResourceClick(
    roadmapId: string,
    itemId: string,
    resourceUrl: string,
    resourceType: string,
  ) {
    this.sendEvent("resource_click", {
      roadmap_id: roadmapId,
      item_id: itemId,
      url: resourceUrl,
      type: resourceType,
    });
  }

  trackProductBanner(action: "view" | "click" | "close", productId: string) {
    this.sendEvent("product_banner", {
      action: action,
      product_id: productId,
    });
  }

  trackTimeOnPage(seconds: number, roadmapId: string) {
    this.sendEvent("time_on_page", {
      seconds: seconds,
      roadmap_id: roadmapId,
    });
  }

  trackScrollDepth(depth: number, roadmapId: string) {
    this.sendEvent("scroll_depth", {
      depth: depth,
      roadmap_id: roadmapId,
    });
  }
}

const analytics = new AnalyticsService();

if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    analytics.sendEvent("js_error", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });
}

export { analytics };
