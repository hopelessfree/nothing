import React, { FC, ReactElement } from 'react';
import { globalData } from '../../config/globalData';
import { Redirect } from 'umi';

const Index: FC = ({ children }): ReactElement => {
  return globalData.token ? (
    <React.Fragment children={children} />
  ) : (
    <Redirect to="/Login" />
  );
};

export default Index;
