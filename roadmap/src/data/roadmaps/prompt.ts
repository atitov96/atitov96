import { RoadmapTopic } from "@/types/roadmap";

export const promptRoadmap: RoadmapTopic = {
  id: "prompt",
  title: "Prompt Engineering",
  description: "Разработка эффективных промптов для AI",
  items: [
    {
      id: "basics",
      title: "Основы Prompt Engineering",
      description: "Базовые принципы работы с промптами",
      type: "concept",
      resources: [],
      children: [
        {
          id: "structure",
          title: "Структура промптов",
          description: "Построение эффективных промптов",
          type: "concept",
          resources: [],
        },
        {
          id: "context",
          title: "Контекст",
          description: "Управление контекстом",
          type: "concept",
          resources: [],
        },
      ],
    },
    {
      id: "advanced",
      title: "Продвинутые техники",
      description: "Продвинутые методы Prompt Engineering",
      type: "concept",
      resources: [],
      children: [
        {
          id: "chain-of-thought",
          title: "Chain of Thought",
          description: "Цепочки размышлений",
          type: "concept",
          resources: [],
        },
        {
          id: "few-shot",
          title: "Few-Shot Learning",
          description: "Обучение на нескольких примерах",
          type: "concept",
          resources: [],
        },
      ],
    },
  ],
};
