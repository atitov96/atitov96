import { RoadmapTopic } from "@/types/roadmap";

export const systemDesignRoadmap: RoadmapTopic = {
  id: "system-design",
  title: "System Design",
  description: "Проектирование и архитектура программных систем",
  items: [
    {
      id: "fundamentals",
      title: "Основы проектирования",
      description: "Базовые принципы и паттерны проектирования",
      type: "concept",
      resources: [],
      children: [
        {
          id: "solid",
          title: "SOLID Principles",
          description: "Принципы объектно-ориентированного проектирования",
          type: "concept",
          resources: [],
        },
        {
          id: "design-patterns",
          title: "Design Patterns",
          description: "Паттерны проектирования и их применение",
          type: "concept",
          resources: [],
        },
      ],
    },
    {
      id: "architecture",
      title: "Архитектура",
      description: "Архитектурные паттерны и стили",
      type: "concept",
      resources: [],
      children: [
        {
          id: "microservices",
          title: "Microservices",
          description: "Микросервисная архитектура",
          type: "concept",
          resources: [],
        },
        {
          id: "design-system",
          title: "Design System",
          description: "Создание и поддержка систем проектирования",
          type: "concept",
          resources: [],
        },
      ],
    },
  ],
};
