export type Precision = 'year' | 'month' | 'day' | 'hour' | 'minute';

export interface SetTimeProps {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  seconds?: number;
}
