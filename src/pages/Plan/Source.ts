import type { Source, SourceItem } from '@/typings/Plan';

function getState(): State {
  const source = new Map<number, SourceItem[]>(
    JSON.parse(localStorage.getItem('Plan') || '[]'),
  );
  const days = [...source.keys()];
  return { source, days };
}

export interface State {
  days: number[];
  source: Source;
}

export enum ActionType {
  UPDATE = 'UPDATE',
  INIT = 'INIT',
}

interface Action {
  type: ActionType;
  source?: Source;
}

export const initialState: State = getState();

export function reducer(state: State, action: Action): State {
  const { type, source = state.source } = action;

  switch (type) {
    case ActionType.INIT:
      return getState();

    case ActionType.UPDATE:
      localStorage.setItem('Plan', JSON.stringify([...source]));
      state.days = [...source.keys()];
      return getState();

    default:
      return getState();
  }
}
