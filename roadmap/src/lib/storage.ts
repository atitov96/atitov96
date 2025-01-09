const STORAGE_KEY = "roadmap_progress";

export interface StorageProgress {
  userId: number;
  items: Record<string, boolean>;
}

export function saveProgress(
  userId: number,
  itemId: string,
  completed: boolean,
) {
  try {
    const storageData = localStorage.getItem(STORAGE_KEY);
    const progress: Record<number, StorageProgress> = storageData
      ? JSON.parse(storageData)
      : {};

    if (!progress[userId]) {
      progress[userId] = { userId, items: {} };
    }

    progress[userId].items[itemId] = completed;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
}

export function getProgress(userId: number): Record<string, boolean> {
  try {
    const storageData = localStorage.getItem(STORAGE_KEY);
    if (!storageData) return {};

    const progress: Record<number, StorageProgress> = JSON.parse(storageData);
    return progress[userId]?.items || {};
  } catch (error) {
    console.error("Failed to get progress:", error);
    return {};
  }
}
