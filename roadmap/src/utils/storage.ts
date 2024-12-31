export const UserProgress = {
    save: (userId: string, roadmapId: string, progress: unknown) => {
      try {
        localStorage.setItem(
          `progress_${userId}_${roadmapId}`, 
          JSON.stringify(progress)
        );
  
        // await api.saveProgress(userId, roadmapId, progress);
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    },
  
    load: (userId: string, roadmapId: string) => {
      try {
        const stored = localStorage.getItem(`progress_${userId}_${roadmapId}`);
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.error('Failed to load progress:', error);
        return null;
      }
    }
};
