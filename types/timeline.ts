export interface TimelineItem {
  id: number;
  date: string;
  title: string;
  content: string;
  hasTable?: boolean;
}

export interface EditingState {
  id: number;
  field: string;
}

export interface VisibleRange {
  start: number;
  end: number;
}
