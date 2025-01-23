import { RoadmapTopic } from "@/types/roadmap";

export const gitRoadmap: RoadmapTopic = {
  id: "git",
  title: "Git & Code Review",
  description: "Система контроля версий и практики code review",
  items: [
    {
      id: "git-basics",
      title: "Основы Git",
      description: "Базовые команды и концепции Git",
      type: "concept",
      resources: [
        {
          title: "Git Documentation",
          url: "https://git-scm.com/doc",
          type: "article",
        },
        {
          title: "Learn Git Branching",
          url: "https://learngitbranching.js.org/",
          type: "article",
        },
      ],
      children: [
        {
          id: "commands",
          title: "Основные команды",
          description: "Базовые команды Git",
          type: "concept",
          resources: [],
          children: [
            {
              id: "basic-commands",
              title: "Базовые команды",
              description: "init, add, commit, push, pull",
              type: "concept",
              resources: [],
            },
            {
              id: "branching-commands",
              title: "Работа с ветками",
              description: "branch, checkout, merge, rebase",
              type: "concept",
              resources: [],
            },
          ],
        },
        {
          id: "workflows",
          title: "Git Workflows",
          description: "Популярные подходы к организации работы с Git",
          type: "concept",
          resources: [],
          children: [
            {
              id: "gitflow",
              title: "GitFlow",
              description: "Модель ветвления GitFlow",
              type: "concept",
              resources: [],
            },
            {
              id: "trunk-based",
              title: "Trunk-Based Development",
              description: "Разработка на основе главной ветки",
              type: "concept",
              resources: [],
            },
          ],
        },
      ],
    },
    {
      id: "code-review",
      title: "Code Review",
      description: "Практики и принципы code review",
      type: "concept",
      resources: [],
      children: [
        {
          id: "pyramid",
          title: "Code Review Pyramid",
          description: "Пирамида приоритетов при проверке кода",
          type: "concept",
          resources: [],
          children: [
            {
              id: "architecture",
              title: "Архитектура",
              description: "Проверка архитектурных решений",
              type: "concept",
              resources: [],
            },
            {
              id: "logic",
              title: "Бизнес-логика",
              description: "Проверка корректности бизнес-логики",
              type: "concept",
              resources: [],
            },
            {
              id: "code-style",
              title: "Стиль кода",
              description: "Проверка соответствия стандартам кодирования",
              type: "concept",
              resources: [],
            },
          ],
        },
        {
          id: "best-practices",
          title: "Лучшие практики",
          description: "Рекомендации по проведению code review",
          type: "concept",
          resources: [],
          children: [
            {
              id: "review-size",
              title: "Размер review",
              description: "Оптимальный размер изменений для review",
              type: "concept",
              resources: [],
            },
            {
              id: "feedback",
              title: "Обратная связь",
              description: "Как давать конструктивную обратную связь",
              type: "concept",
              resources: [],
            },
          ],
        },
      ],
    },
  ],
};
