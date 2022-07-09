export interface AccontContent {
  title: string;
  blues: number;
  play: number;
}

export interface AccontData {
  name: string;
  fans: number;
  like: number;
  shop: boolean;

  content: AccontContent[];
}
