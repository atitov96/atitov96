import { RoadmapTopic } from "@/types/roadmap";

export const backendRoadmap: RoadmapTopic = {
    id: 'backend',
    title: 'Backend Development',
    description: 'Общий путь backend разработчика',
    items: [
        {
          id: 'languages',
          title: 'Выбор языка программирования',
          description: 'Основные языки для backend разработки',
          type: 'concept',
          resources: [],
          children: [
            {
              id: 'go',
              title: 'Go',
              description: 'Статически типизированный язык с поддержкой конкурентности',
              type: 'concept',
              resources: [
                {
                  type: 'official',
                  title: 'Go Documentation',
                  url: 'https://golang.org/doc/',
                  badge: 'Official'
                }
              ]
            },
            {
              id: 'python',
              title: 'Python',
              description: 'Высокоуровневый язык с богатой экосистемой',
              type: 'concept',
              resources: [
                {
                  type: 'official',
                  title: 'Python Website',
                  url: 'https://www.python.org/',
                  badge: 'Official'
                }
              ]
            }
          ]
        },
        {
            id: 'internet',
            title: 'Основы интернета',
            description: 'Фундаментальные знания о работе интернета',
            type: 'concept',
            resources: [
              {
                type: 'article',
                title: 'How does the Internet Work?',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work',
                badge: 'Article'
              }
            ],
            children: [
              {
                id: 'how-internet-works',
                title: 'Как работает интернет',
                description: 'Основные принципы работы интернета',
                type: 'concept',
                resources: []
              },
              {
                id: 'http',
                title: 'HTTP',
                description: 'Протокол передачи гипертекста',
                type: 'concept',
                resources: []
              },
              {
                id: 'dns',
                title: 'DNS',
                description: 'Система доменных имён',
                type: 'concept',
                resources: []
              },
              {
                id: 'domain-name',
                title: 'Доменные имена',
                description: 'Структура и работа доменных имён',
                type: 'concept',
                resources: []
              },
              {
                id: 'hosting',
                title: 'Хостинг',
                description: 'Размещение веб-сайтов и приложений',
                type: 'concept',
                resources: []
              }
            ]
          },
          {
            id: 'prog-language',
            title: 'Языки программирования',
            description: 'Основные языки для backend разработки',
            type: 'concept',
            resources: [],
            children: [
              {
                id: 'go',
                title: 'Go',
                description: 'Современный язык для высоконагруженных систем',
                type: 'concept',
                resources: [
                  {
                    type: 'official',
                    title: 'Go Documentation',
                    url: 'https://golang.org/doc/',
                    badge: 'Official'
                  }
                ]
              },
              {
                id: 'python',
                title: 'Python',
                description: 'Универсальный высокоуровневый язык',
                type: 'concept',
                resources: [
                  {
                    type: 'official',
                    title: 'Python Documentation',
                    url: 'https://docs.python.org/',
                    badge: 'Official'
                  }
                ]
              },
              {
                id: 'rust',
                title: 'Rust',
                description: 'Системный язык программирования',
                type: 'concept',
                resources: [
                  {
                    type: 'official',
                    title: 'Rust Documentation',
                    url: 'https://www.rust-lang.org/learn',
                    badge: 'Official'
                  }
                ]
              }
            ]
          },
          {
            id: 'version-control',
            title: 'Контроль версий',
            description: 'Системы управления версиями',
            type: 'concept',
            resources: [],
            children: [
              {
                id: 'git',
                title: 'Git',
                description: 'Распределённая система контроля версий',
                type: 'concept',
                resources: []
              },
              {
                id: 'repo-hosting',
                title: 'Хостинг репозиториев',
                description: 'Платформы для хранения кода',
                type: 'concept',
                resources: [],
                children: [
                  {
                    id: 'github',
                    title: 'GitHub',
                    description: 'Популярная платформа для совместной разработки',
                    type: 'concept',
                    resources: []
                  },
                  {
                    id: 'gitlab',
                    title: 'GitLab',
                    description: 'Платформа для полного цикла DevOps',
                    type: 'concept',
                    resources: []
                  },
                  {
                    id: 'bitbucket',
                    title: 'Bitbucket',
                    description: 'Хостинг репозиториев от Atlassian',
                    type: 'concept',
                    resources: []
                  }
                ]
              }
            ]
          },
          {
            id: 'databases',
            title: 'Базы данных',
            description: 'Системы управления базами данных',
            type: 'concept',
            resources: [],
            children: [
              {
                id: 'relational',
                title: 'Реляционные БД',
                description: 'SQL базы данных',
                type: 'concept',
                resources: [],
                children: [
                  {
                    id: 'postgresql',
                    title: 'PostgreSQL',
                    description: 'Продвинутая объектно-реляционная БД',
                    type: 'concept',
                    resources: []
                  },
                  {
                    id: 'mysql',
                    title: 'MySQL',
                    description: 'Популярная реляционная БД',
                    type: 'concept',
                    resources: []
                  },
                  {
                    id: 'mariadb',
                    title: 'MariaDB',
                    description: 'Форк MySQL с открытым исходным кодом',
                    type: 'concept',
                    resources: []
                  }
                ]
              },
              {
                id: 'nosql',
                title: 'NoSQL БД',
                description: 'Нереляционные базы данных',
                type: 'concept',
                resources: [],
                children: [
                  {
                    id: 'mongodb',
                    title: 'MongoDB',
                    description: 'Документоориентированная БД',
                    type: 'concept',
                    resources: []
                  },
                  {
                    id: 'redis',
                    title: 'Redis',
                    description: 'In-memory база данных',
                    type: 'concept',
                    resources: []
                  },
                  {
                    id: 'cassandra',
                    title: 'Cassandra',
                    description: 'Распределённая NoSQL БД',
                    type: 'concept',
                    resources: []
                  }
                ]
              }
            ]
          },
          {
            id: 'api',
            title: 'APIs и Протоколы',
            description: 'Методы взаимодействия между системами',
            type: 'concept',
            resources: [],
            children: [
              {
                id: 'rest',
                title: 'REST',
                description: 'Архитектурный стиль для распределенных систем',
                type: 'concept',
                resources: [
                  {
                    type: 'article',
                    title: 'Understanding REST',
                    url: 'https://restfulapi.net/',
                    badge: 'Article'
                  }
                ]
              },
              {
                id: 'json-api',
                title: 'JSON APIs',
                description: 'Стандарт для построения JSON APIs',
                type: 'concept',
                resources: []
              },
              {
                id: 'graphql',
                title: 'GraphQL',
                description: 'Язык запросов для API',
                type: 'concept',
                resources: []
              },
              {
                id: 'grpc',
                title: 'gRPC',
                description: 'Высокопроизводительный RPC фреймворк',
                type: 'concept',
                resources: []
              },
              {
                id: 'authentication',
                title: 'Аутентификация',
                description: 'Методы проверки подлинности',
                type: 'concept',
                resources: [],
                children: [
                  {
                    id: 'jwt',
                    title: 'JWT',
                    description: 'JSON Web Tokens',
                    type: 'concept',
                    resources: []
                  },
                  {
                    id: 'oauth',
                    title: 'OAuth',
                    description: 'Протокол авторизации',
                    type: 'concept',
                    resources: []
                  },
                  {
                    id: 'openid',
                    title: 'OpenID',
                    description: 'Стандарт децентрализованной аутентификации',
                    type: 'concept',
                    resources: []
                  }
                ]
              }
            ]
          },
          {
            id: 'caching',
            title: 'Кэширование',
            description: 'Методы оптимизации производительности',
            type: 'concept',
            resources: [],
            children: [
              {
                id: 'client-side',
                title: 'Client Side',
                description: 'Кэширование на стороне клиента',
                type: 'concept',
                resources: []
              },
              {
                id: 'server-side',
                title: 'Server Side',
                description: 'Кэширование на сервере',
                type: 'concept',
                resources: [],
                children: [
                  {
                    id: 'redis',
                    title: 'Redis',
                    description: 'In-memory база данных и кэш',
                    type: 'concept',
                    resources: []
                  },
                  {
                    id: 'memcached',
                    title: 'Memcached',
                    description: 'Распределённая система кэширования',
                    type: 'concept',
                    resources: []
                  }
                ]
              }
            ]
          },
          {
            id: 'web-servers',
            title: 'Web серверы',
            description: 'Серверное ПО для обработки HTTP запросов',
            type: 'concept',
            resources: [],
            children: [
              {
                id: 'nginx',
                title: 'Nginx',
                description: 'Высокопроизводительный веб-сервер',
                type: 'concept',
                resources: []
              },
              {
                id: 'apache',
                title: 'Apache',
                description: 'Классический веб-сервер',
                type: 'concept',
                resources: []
              }
            ]
          },
          {
            id: 'testing',
            title: 'Тестирование',
            description: 'Методы проверки качества кода',
            type: 'concept',
            resources: [],
            children: [
              {
                id: 'unit',
                title: 'Unit Testing',
                description: 'Модульное тестирование',
                type: 'concept',
                resources: []
              },
              {
                id: 'integration',
                title: 'Integration Testing',
                description: 'Интеграционное тестирование',
                type: 'concept',
                resources: []
              },
              {
                id: 'functional',
                title: 'Functional Testing',
                description: 'Функциональное тестирование',
                type: 'concept',
                resources: []
              }
            ]
          },
          {
            id: 'ci-cd',
            title: 'CI/CD',
            description: 'Непрерывная интеграция и доставка',
            type: 'concept',
            resources: [],
            children: [
              {
                id: 'gitlab-ci',
                title: 'GitLab CI',
                description: 'CI/CD в GitLab',
                type: 'concept',
                resources: []
              },
              {
                id: 'github-actions',
                title: 'GitHub Actions',
                description: 'CI/CD в GitHub',
                type: 'concept',
                resources: []
              }
            ]
          },
          {
            id: 'architectural-patterns',
            title: 'Архитектурные паттерны',
            description: 'Шаблоны проектирования систем',
            type: 'concept',
            resources: [],
            children: [
              {
                id: 'monolithic',
                title: 'Monolithic',
                description: 'Монолитная архитектура',
                type: 'concept',
                resources: []
              },
              {
                id: 'microservices',
                title: 'Microservices',
                description: 'Микросервисная архитектура',
                type: 'concept',
                resources: []
              },
              {
                id: 'serverless',
                title: 'Serverless',
                description: 'Бессерверная архитектура',
                type: 'concept',
                resources: []
              }
            ]
          },
          {
            id: 'message-brokers',
            title: 'Message Brokers',
            description: 'Системы обмена сообщениями',
            type: 'concept',
            resources: [],
            children: [
              {
                id: 'rabbitmq',
                title: 'RabbitMQ',
                description: 'AMQP брокер сообщений',
                type: 'concept',
                resources: []
              },
              {
                id: 'kafka',
                title: 'Apache Kafka',
                description: 'Распределённая система обмена сообщениями',
                type: 'concept',
                resources: []
              }
            ]
          },
          {
            id: 'search-engines',
            title: 'Search Engines',
            description: 'Поисковые системы',
            type: 'concept',
            resources: [],
            children: [
              {
                id: 'elasticsearch',
                title: 'Elasticsearch',
                description: 'Поисковый и аналитический движок',
                type: 'concept',
                resources: []
              },
              {
                id: 'solr',
                title: 'Solr',
                description: 'Платформа полнотекстового поиска',
                type: 'concept',
                resources: []
              }
            ]
          },
          {
            id: 'containerization',
            title: 'Контейнеризация',
            description: 'Технологии контейнеризации',
            type: 'concept',
            resources: [],
            children: [
              {
                id: 'docker',
                title: 'Docker',
                description: 'Платформа контейнеризации',
                type: 'concept',
                resources: []
              },
              {
                id: 'kubernetes',
                title: 'Kubernetes',
                description: 'Оркестрация контейнеров',
                type: 'concept',
                resources: []
              }
            ]
          },
          {
            id: 'scaling',
            title: 'Масштабирование',
            description: 'Методы масштабирования систем',
            type: 'concept',
            resources: [],
            children: [
              {
                id: 'horizontal',
                title: 'Горизонтальное',
                description: 'Масштабирование через добавление серверов',
                type: 'concept',
                resources: []
              },
              {
                id: 'vertical',
                title: 'Вертикальное',
                description: 'Масштабирование через увеличение мощности',
                type: 'concept',
                resources: []
              },
              {
                id: 'strategies',
                title: 'Стратегии',
                description: 'Подходы к масштабированию',
                type: 'concept',
                resources: [],
                children: [
                  {
                    id: 'load-balancing',
                    title: 'Load Balancing',
                    description: 'Балансировка нагрузки',
                    type: 'concept',
                    resources: []
                  },
                  {
                    id: 'sharding',
                    title: 'Sharding',
                    description: 'Разделение данных',
                    type: 'concept',
                    resources: []
                  }
                ]
              }
            ]
          }
      ]
}
