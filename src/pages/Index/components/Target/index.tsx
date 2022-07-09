import React, { useState, useEffect, FC, ReactElement } from 'react';
import './index.less';

const Index: FC = (): ReactElement => {
  return (
    <div className="target">
      <h1 className="target-title">目标</h1>

      <div className={'target-list'}>
        <div className={'target-item'}>今日目标</div>
      </div>
    </div>
  );
};

export default Index;
