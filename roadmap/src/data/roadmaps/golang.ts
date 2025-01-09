import { RoadmapTopic } from "@/types/roadmap";

export const golangRoadmap: RoadmapTopic = {
  id: "golang",
  title: "Go Development",
  description: "Путь к становлению Go разработчиком",
  next: "backend",
  items: [
    {
      id: "learn-basics",
      title: "Изучение основ",
      description:
        "Базовые концепции Go: переменные, циклы, условные операторы, функции и типы данных",
      type: "concept",
      resources: [
        {
          type: "official",
          title: "Go Tutorial",
          url: "https://go.dev/doc/tutorial/getting-started",
        },
        {
          type: "article",
          title: "W3Schools Go Tutorial",
          url: "https://www.w3schools.com/go/",
        },
      ],
      children: [
        {
          id: "basic-syntax",
          title: "Базовый синтаксис",
          description: "Структура Go программ, импорты пакетов, main функция",
          type: "concept",
          resources: [],
        },
        {
          id: "types",
          title: "Типы",
          description: "Базовые, агрегатные, ссылочные и интерфейсные типы",
          type: "concept",
          resources: [
            {
              type: "official",
              title: "Types Assertions",
              url: "https://go.dev/tour/methods/15",
              badge: "Official",
            },
          ],
        },
        {
          id: "control-structures",
          title: "Управляющие конструкции",
          description: "if/else, switch, for, range",
          type: "concept",
          resources: [],
        },
        {
          id: "functions",
          title: "Функции",
          description:
            "Объявление функций, параметры, возвращаемые значения, множественные возвращаемые значения",
          type: "concept",
          resources: [],
        },
      ],
    },
    {
      id: "going-deeper",
      title: "Углубленное изучение",
      description: "Продвинутые концепции Go",
      type: "concept",
      resources: [],
      children: [
        {
          id: "concurrency",
          title: "Concurrency",
          description: "Горутины, каналы, select, sync пакет",
          type: "concept",
          resources: [],
        },
        {
          id: "interfaces",
          title: "Интерфейсы",
          description: "Определение и использование интерфейсов, композиция",
          type: "concept",
          resources: [],
        },
        {
          id: "error-handling",
          title: "Обработка ошибок",
          description: "Создание и обработка ошибок, panic и recover",
          type: "concept",
          resources: [],
        },
      ],
    },
    {
      id: "advanced-concepts",
      title: "Продвинутые концепции",
      description:
        "Углубленное изучение возможностей Go для улучшения производительности и читаемости кода",
      type: "concept",
      resources: [
        {
          type: "article",
          title: "Mastering Advance GO",
          url: "https://go101.org/article/101.html",
          badge: "Article",
        },
      ],
      children: [
        {
          id: "go-modules",
          title: "Go Modules",
          description:
            "Система управления зависимостями и версионирования в Go",
          type: "concept",
          resources: [
            {
              type: "official",
              title: "Go Modules",
              url: "https://go.dev/doc/modules/managing-dependencies",
              badge: "Official",
            },
            {
              type: "article",
              title: "How to use Go Modules",
              url: "https://www.digitalocean.com/community/tutorials/how-to-use-go-modules",
              badge: "Article",
            },
          ],
        },
        {
          id: "cli-apps",
          title: "CLI приложения",
          description: "Разработка консольных приложений на Go",
          type: "concept",
          resources: [
            {
              type: "official",
              title: "Command-line Interfaces (CLIs)",
              url: "https://go.dev/doc/tutorial/create-module",
              badge: "Official",
            },
          ],
        },
      ],
    },
    {
      id: "web-development",
      title: "Веб-разработка",
      description: "Разработка веб-приложений и микросервисов на Go",
      type: "concept",
      resources: [],
      children: [
        {
          id: "web-frameworks",
          title: "Веб фреймворки",
          description: "Популярные фреймворки: Gin, Echo, Beego, Revel",
          type: "concept",
          resources: [
            {
              type: "article",
              title: "Comparison of Web Frameworks",
              url: "https://github.com/mingrammer/go-web-framework-stars",
              badge: "Article",
            },
          ],
        },
        {
          id: "orms",
          title: "ORM",
          description: "Работа с базами данных через ORM (GORM)",
          type: "concept",
          resources: [],
        },
        {
          id: "realtime",
          title: "Realtime коммуникация",
          description: "WebSocket, MQTT, Server-Sent Events",
          type: "concept",
          resources: [
            {
              type: "video",
              title: "Golang websocket",
              url: "https://www.youtube.com/watch?v=CIh8qN7LO8M",
              badge: "Video",
            },
          ],
        },
      ],
    },
    {
      id: "microservices",
      title: "Микросервисы",
      description: "Разработка и развертывание микросервисной архитектуры",
      type: "concept",
      resources: [
        {
          type: "article",
          title: "Introduction to Microservices",
          url: "https://microservices.io/patterns/microservices.html",
          badge: "Article",
        },
      ],
      children: [
        {
          id: "api-clients",
          title: "API Clients",
          description: "Разработка и использование API клиентов",
          type: "concept",
          resources: [],
        },
        {
          id: "testing",
          title: "Тестирование",
          description: "Модульное и интеграционное тестирование Go кода",
          type: "concept",
          resources: [
            {
              type: "official",
              title: "Go Tutorial: Add a Test",
              url: "https://go.dev/doc/tutorial/add-a-test",
              badge: "Official",
            },
            {
              type: "article",
              title: "Learn Go with Tests",
              url: "https://quii.gitbook.io/learn-go-with-tests/",
              badge: "Article",
            },
          ],
        },
      ],
    },
  ],
};
