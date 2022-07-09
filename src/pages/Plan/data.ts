import { SourceItem } from '@/typings/Plan';

const plan: SourceItem[] = [
  { key: 'sleep', finish: false, content: '睡觉' },
  { key: 'eat', finish: false, content: '吃饭' },
  { key: 'study', finish: false, content: '学习' },
];

export const source: [number, SourceItem[]][] = [
  [1645459200000, plan],
  [1645545600000, plan],
  [1645632000000, plan],
  [1645718400000, plan],
  [1645804800000, plan],
  [1645891200000, plan],
  [1645977600000, plan],
];
