import { RoadmapTopic } from "@/types/roadmap";

export const linuxRoadmap: RoadmapTopic = {
  id: "linux",
  title: "Linux Administration",
  description: "Администрирование Linux систем",
  items: [
    {
      id: "basics",
      title: "Основы Linux",
      description: "Базовые концепции Linux",
      type: "concept",
      resources: [],
      children: [
        {
          id: "file-system",
          title: "Файловая система",
          description: "Структура файловой системы",
          type: "concept",
          resources: [],
        },
        {
          id: "permissions",
          title: "Права доступа",
          description: "Управление правами",
          type: "concept",
          resources: [],
        },
      ],
    },
    {
      id: "advanced",
      title: "Продвинутое администрирование",
      description: "Продвинутые темы Linux",
      type: "concept",
      resources: [],
      children: [
        {
          id: "processes",
          title: "Процессы",
          description: "Управление процессами",
          type: "concept",
          resources: [],
        },
        {
          id: "networking",
          title: "Сети",
          description: "Сетевое администрирование",
          type: "concept",
          resources: [],
        },
      ],
    },
  ],
};
