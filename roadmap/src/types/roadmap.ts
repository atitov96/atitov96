export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  items: RoadmapItem[];
  next?: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  type: "task" | "concept" | "project";
  status?: "done" | "in-progress" | "skip";
  resources: Resource[];
  children?: RoadmapItem[];
}

export interface Resource {
  type: "official" | "article" | "video" | "book";
  title: string;
  url: string;
  duration?: string;
  badge?: "Official" | "Article" | "Video" | "Feed";
}

export interface UserProgress {
  userId: number;
  topicId: string;
  itemId: string;
  completed: boolean;
  timestamp: number;
}
