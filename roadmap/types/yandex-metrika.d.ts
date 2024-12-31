interface Window {
  ym: (
    counterId: number, 
    eventName: 'hit' | 'reachGoal' | string, 
    eventParams: string | {
      itemId?: string;
      status?: string;
      user?: string;
      progress?: number;
      from?: string;
      to?: string;
      topic_id?: number;
      roadmap_type?: string;
      depth?: number;
      [key: string]: any;
    }
  ) => void;
}

declare const window: Window;