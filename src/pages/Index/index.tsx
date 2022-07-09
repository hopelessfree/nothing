import { FC, ReactElement } from 'react';
import { Row, Col } from 'antd';
import dayjs from 'dayjs';
import './index.less';
import TodoList from './components/TodoList';
import Target from './components/Target';
const Index: FC = (): ReactElement => {
  const getNow = (): string => {
    const curTime = dayjs().get('hours');
    let slot: string;

    if (0 <= curTime && curTime <= 5) {
      slot = '凌晨';
    } else if (5 <= curTime && curTime <= 11) {
      slot = '早上';
    } else if (11 <= curTime && curTime <= 13) {
      slot = '中午';
    } else if (13 <= curTime && curTime <= 18) {
      slot = '下午';
    } else {
      slot = '晚上';
    }

    return slot;
  };

  return (
    <div className="index">
      <Row
        gutter={[40, 10]}
        style={{
          marginTop: 60,
        }}
      >
        <Col span={14} children={<TodoList />} />

        <Col span={10} children={<Target />} />
      </Row>
    </div>
  );
};

export default Index;
