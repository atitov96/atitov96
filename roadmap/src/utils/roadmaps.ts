import { roadmaps } from "@/data/roadmaps";
import { RoadmapTopic, UserProgress } from "@/types/roadmap";

export function getRoadmapData(type: string): RoadmapTopic | null {
  return roadmaps[type] || null;
}

export async function loadUserProgress(userId: number, roadmapType: string) {
  try {
    const response = await fetch(`/api/progress/${userId}/${roadmapType}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to load progress:", error);
    return [];
  }
}

export async function saveUserProgress(progress: UserProgress) {
  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(progress),
    });
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
}
