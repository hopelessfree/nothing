export interface IMineItem {
  isMine: boolean; // 是否为地雷
  show: boolean; // 是否点击过展示
  mineCount: number; // 九宫格内地雷的总数
  flag: number; // 当前的标记 0:无标记 1:旗帜（确定为地雷） 2:问号（不确定）
  index?: number; // 位置索引
}
