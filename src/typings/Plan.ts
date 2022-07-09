export interface SourceItem {
  key: string;
  finish: boolean;
  content: string;
}

export type Source = Map<number, SourceItem[]>;
