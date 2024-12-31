import { RoadmapTopic } from "@/types/roadmap";

export const gitRoadmap: RoadmapTopic = {
    id: 'git',
    title: 'Git & Code Review',
    description: 'Система контроля версий и практики code review',
    items: [
      {
        id: 'git-basics',
        title: 'Основы Git',
        description: 'Базовые команды и концепции Git',
        type: 'concept',
        resources: [],
        children: [
          {
            id: 'commands',
            title: 'Основные команды',
            description: 'Базовые команды Git',
            type: 'concept',
            resources: []
          }
        ]
      },
      {
        id: 'code-review',
        title: 'Code Review',
        description: 'Практики и принципы code review',
        type: 'concept',
        resources: [],
        children: [
          {
            id: 'pyramid',
            title: 'Code Review Pyramid',
            description: 'Пирамида приоритетов при проверке кода',
            type: 'concept',
            resources: []
          }
        ]
      }
    ]
};