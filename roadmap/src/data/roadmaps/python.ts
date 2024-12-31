import { RoadmapTopic } from "@/types/roadmap";

export const pythonRoadmap: RoadmapTopic = {
  id: 'python',
  title: 'Python Development',
  description: 'Путь к становлению Python разработчиком',
  items: [
    {
      id: 'basics',
      title: 'Основы Python',
      description: 'Базовые концепции языка',
      type: 'concept',
      resources: [
        {
          type: 'official',
          title: 'Python Website',
          url: 'https://www.python.org/',
          badge: 'Official'
        },
        {
          type: 'article',
          title: 'W3Schools - Python Tutorial',
          url: 'https://www.w3schools.com/python/',
          badge: 'Article'
        }
      ],
      children: [
        {
          id: 'syntax',
          title: 'Базовый синтаксис',
          description: 'Настройка окружения и основы синтаксиса',
          type: 'concept',
          resources: [
            {
              type: 'article',
              title: 'Python Basics',
              url: 'https://pythonbasics.org/',
              badge: 'Article'
            }
          ]
        },
        {
          id: 'variables',
          title: 'Переменные и типы данных',
          description: 'Работа с переменными и базовыми типами данных',
          type: 'concept',
          resources: [
            {
              type: 'article',
              title: 'Variables in Python',
              url: 'https://realpython.com/python-variables/',
              badge: 'Article'
            }
          ]
        }
      ]
    },
    {
      id: 'data-structures',
      title: 'Структуры данных',
      description: 'Встроенные структуры данных Python',
      type: 'concept',
      resources: [],
      children: [
        {
          id: 'lists-tuples',
          title: 'Списки и кортежи',
          description: 'Работа со списками и кортежами',
          type: 'concept',
          resources: [
            {
              type: 'official',
              title: 'Lists Documentation',
              url: 'https://docs.python.org/3/tutorial/introduction.html#lists',
              badge: 'Official'
            }
          ]
        },
        {
          id: 'sets-dicts',
          title: 'Множества и словари',
          description: 'Работа с множествами и словарями',
          type: 'concept',
          resources: []
        }
      ]
    },
    {
      id: 'oop',
      title: 'ООП в Python',
      description: 'Объектно-ориентированное программирование',
      type: 'concept',
      resources: [
        {
          type: 'article',
          title: 'Object Oriented Programming in Python',
          url: 'https://realpython.com/python3-object-oriented-programming/',
          badge: 'Article'
        }
      ],
      children: [
        {
          id: 'classes',
          title: 'Классы и объекты',
          description: 'Создание и использование классов',
          type: 'concept',
          resources: []
        },
        {
          id: 'inheritance',
          title: 'Наследование',
          description: 'Наследование и полиморфизм',
          type: 'concept',
          resources: []
        }
      ]
    },
    {
      id: 'web-frameworks',
      title: 'Веб фреймворки',
      description: 'Популярные веб фреймворки Python',
      type: 'concept',
      resources: [],
      children: [
        {
          id: 'django',
          title: 'Django',
          description: 'Полнофункциональный веб-фреймворк',
          type: 'concept',
          resources: [
            {
              type: 'official',
              title: 'Django Documentation',
              url: 'https://docs.djangoproject.com/',
              badge: 'Official'
            }
          ]
        },
        {
          id: 'flask',
          title: 'Flask',
          description: 'Легковесный веб-фреймворк',
          type: 'concept',
          resources: [
            {
              type: 'official',
              title: 'Flask Documentation',
              url: 'https://flask.palletsprojects.com/',
              badge: 'Official'
            }
          ]
        },
        {
          id: 'fastapi',
          title: 'FastAPI',
          description: 'Современный веб-фреймворк для создания API',
          type: 'concept',
          resources: []
        }
      ]
    }
  ]
};