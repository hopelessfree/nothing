import { FC, ReactElement } from 'react';

import { Spin } from 'antd';
import './index.less';

const Loading: FC = (): ReactElement => {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
