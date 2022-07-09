import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  routes: routes,
  // locale: {},
  history: {
    type: 'hash',
  },
  antd: {},
  // layout: {
  //   name: '123',
  // },
  dva: {},
  // 打包后资源加载路径
  publicPath: './',
  // 热刷新，保留表单信息
  fastRefresh: {},
  // 按需加载
  dynamicImport: {
    loading: '@/components/Loading',
  },
  // 替换压缩器为 esbuild
  esbuild: {},
  // 主题配置
  theme: {
    'primary-color': '#FF2851',
    'link-color': '#FF2851',
  },
  // 热更新
  mfsu: {},
});
