import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  layout: 'mix',
  navTheme: 'light',
  contentWidth: 'Fluid',
  primaryColor: '#FF2851',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  pwa: false,
  iconfontUrl: '',
} as LayoutSettings & {
  pwa: boolean;
};
