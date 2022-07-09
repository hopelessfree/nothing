import { Settings as LayoutSettings } from '@ant-design/pro-layout';

import { RequestConfig } from 'umi';

import globalData from '../config/globalData';
import errorHandler from '../config/request/errHandle';
import defaultSettings from '../config/defaultSettings';
import requestHandler from '../config/request/reqHandle';
import responseHandler from '../config/request/resHandle';

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
}> {
  console.log(defaultSettings);
  return {
    settings: defaultSettings,
  };
}

// export const layout = ({
//   initialState,
// }: {
//   initialState: { settings?: LayoutSettings };
// }) => initialState

export const request: RequestConfig = {
  timeout: 10000,
  prefix: 'http://localhost',
  errorHandler,
  requestInterceptors: [requestHandler],
  responseInterceptors: [responseHandler],
  middlewares: [],
};

// 全局注入对象
// @ts-ignore
window.globalData = globalData;
