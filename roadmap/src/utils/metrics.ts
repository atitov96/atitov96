export type EventName = 'topic_click' | 'contact_mentor' | 'section_view' | 'scroll_depth';

export interface TopicClickParams {
  topic_id: number;
  roadmap_type: string;
}

export interface ScrollDepthParams {
  depth: number;
}

export type EventParams = TopicClickParams | ScrollDepthParams | Record<string, never>;

export const trackEvent = (eventName: EventName, params?: EventParams): void => {
    if (typeof window !== "undefined" && window.ym) {
        window.ym(99090271, eventName, {
            event: eventName,
            ...params
        });
    }
};