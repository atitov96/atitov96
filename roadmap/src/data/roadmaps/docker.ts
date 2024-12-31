import { RoadmapTopic } from "@/types/roadmap";

export const dockerRoadmap: RoadmapTopic = {
    id: 'docker',
    title: 'Docker & Kubernetes',
    description: 'Контейнеризация и оркестрация',
    items: [
      {
        id: 'docker-basics',
        title: 'Основы Docker',
        description: 'Базовые концепции контейнеризации',
        type: 'concept',
        resources: [
          {
            type: 'official',
            title: 'Docker Overview',
            url: 'https://docs.docker.com/get-started/overview/',
            badge: 'Official'
          }
        ],
        children: [
          {
            id: 'containers',
            title: 'Контейнеры',
            description: 'Работа с контейнерами',
            type: 'concept',
            resources: []
          },
          {
            id: 'dockerfile',
            title: 'Dockerfile',
            description: 'Создание Docker образов',
            type: 'concept',
            resources: []
          }
        ]
      },
      {
        id: 'kubernetes',
        title: 'Kubernetes',
        description: 'Оркестрация контейнеров',
        type: 'concept',
        resources: [],
        children: [
          {
            id: 'pods',
            title: 'Pods',
            description: 'Базовые объекты Kubernetes',
            type: 'concept',
            resources: []
          },
          {
            id: 'deployments',
            title: 'Deployments',
            description: 'Управление развертыванием',
            type: 'concept',
            resources: []
          }
        ]
      }
    ]
};