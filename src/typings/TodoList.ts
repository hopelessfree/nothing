export enum TodoItemComplete {
  All = 'All',
  Done = 'Done',
  GiveUp = 'GiveUp',
  Incomplete = 'Incomplete',
}
export enum TodoItemStatus {
  All = 'All',
  NotStarted = 'NotStarted',
  On = 'On',
  End = 'End',
}

export interface TodoItemProps {
  title: string; // 标题
  describe?: string; // 描述
  remarks?: string; // 备注

  startTime?: number; // 开始时间
  endTime?: number; // 结束时间

  status: TodoItemStatus; // 任务状态
  complate: TodoItemComplete; // 完成状态

  createTime: number; // 创建时间
}
