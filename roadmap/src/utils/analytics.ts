export const Analytics = {
    pageView: (pageName: string) => {
      if (window.ym) {
        window.ym(99090271, 'hit', {
          event: 'page_view',
          pageName
        });
      }
    },
  
    trackStatus: (itemId: string, status: string, user?: string) => {
      if (window.ym) {
        window.ym(99090271, 'reachGoal', {
          event: 'status_change',
          itemId,
          status,
          user
        });
      }
    },
  
    trackProgress: (progress: number, user?: string) => {
      if (window.ym) {
        window.ym(99090271, 'reachGoal', {
          event: 'progress_update',
          progress,
          user
        });
      }
    },
  
    trackTabChange: (fromTab: string, toTab: string) => {
      if (window.ym) {
        window.ym(99090271, 'reachGoal', {
          event: 'tab_switch',
          from: fromTab,
          to: toTab
        });
      }
    }
};
