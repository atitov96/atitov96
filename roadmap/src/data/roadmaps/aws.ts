import { RoadmapTopic } from "@/types/roadmap";

export const awsRoadmap: RoadmapTopic = {
    id: 'aws',
    title: 'AWS Cloud',
    description: 'Amazon Web Services инфраструктура',
    items: [
      {
        id: 'aws-basics',
        title: 'Основы AWS',
        description: 'Базовые сервисы AWS',
        type: 'concept',
        resources: [
          {
            type: 'official',
            title: 'AWS Documentation',
            url: 'https://docs.aws.amazon.com/',
            badge: 'Official'
          }
        ],
        children: [
          {
            id: 'ec2',
            title: 'EC2',
            description: 'Виртуальные серверы',
            type: 'concept',
            resources: []
          },
          {
            id: 's3',
            title: 'S3',
            description: 'Объектное хранилище',
            type: 'concept',
            resources: []
          }
        ]
      },
      {
        id: 'advanced',
        title: 'Продвинутые сервисы',
        description: 'Специализированные сервисы AWS',
        type: 'concept',
        resources: [],
        children: [
          {
            id: 'lambda',
            title: 'Lambda',
            description: 'Serverless функции',
            type: 'concept',
            resources: []
          },
          {
            id: 'rds',
            title: 'RDS',
            description: 'Реляционные базы данных',
            type: 'concept',
            resources: []
          }
        ]
      }
    ]
};