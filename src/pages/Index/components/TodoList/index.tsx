import Moment from 'moment';
import './index.less';

import { FC, useState, ReactElement, useReducer, useEffect } from 'react';

import { Alert, Button } from 'antd';

import { reducer, initialState } from '@/pages/Plan/Source';

import { SourceItem } from '@/typings/Plan';

const Index: FC = (): ReactElement => {
  const today = Moment().startOf('d').valueOf();
  const [state] = useReducer(reducer, initialState);
  const [source, setSource] = useState<SourceItem[]>([]);

  useEffect(() => {
    const source = state.source.get(today) || [];
    setSource(source);
  }, [state.source]);

  return (
    <div className="todolist">
      {/* 标题 */}
      <h1 className="todolist-title">待办事项</h1>

      {source.map((item) => (
        <Alert
          message={item.content}
          type={item.finish ? 'success' : 'warning'}
          style={{ marginTop: 10 }}
          onClick={() => console.log('111')}
        />
      ))}
    </div>
  );
};

export default Index;
