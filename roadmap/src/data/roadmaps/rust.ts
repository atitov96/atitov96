import { RoadmapTopic } from "@/types/roadmap";

export const rustRoadmap: RoadmapTopic = {
  id: "rust",
  title: "Rust Development",
  description: "Изучение системного программирования на Rust",
  items: [
    {
      id: "rust-basics",
      title: "Основы Rust",
      description: "Базовые концепции языка Rust",
      type: "concept",
      resources: [
        {
          type: "official",
          title: "The Rust Programming Language Book",
          url: "https://doc.rust-lang.org/book/",
          badge: "Official",
        },
      ],
      children: [
        {
          id: "ownership",
          title: "Владение и заимствование",
          description: "Система владения в Rust",
          type: "concept",
          resources: [],
        },
        {
          id: "lifetimes",
          title: "Времена жизни",
          description: "Работа с временами жизни",
          type: "concept",
          resources: [],
        },
      ],
    },
    {
      id: "memory-safety",
      title: "Управление памятью",
      description: "Безопасная работа с памятью",
      type: "concept",
      resources: [],
      children: [
        {
          id: "smart-pointers",
          title: "Умные указатели",
          description: "Box, Rc, Arc и другие",
          type: "concept",
          resources: [],
        },
      ],
    },
  ],
};
