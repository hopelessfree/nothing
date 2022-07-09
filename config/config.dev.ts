import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.API': 'https://www.baidu.com',
    'process.env.BASE': 'sxw',
  },
});
