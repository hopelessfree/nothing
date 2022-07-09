import { MenuDataItem } from '@ant-design/pro-layout';

const routes: MenuDataItem = [
  {
    path: '/Login',
    component: '@/layouts/Login',
  },
  {
    path: '/',
    component: '@/layouts/Base',
    // wrappers: ['@/wrappers/Authorized'],
    routes: [
      {
        path: '/',
        component: '@/pages/Index',
      },

      // 扫雷
      {
        path: '/Mine',
        name: '扫雷',
        icon: 'AimOutlined',
        component: '@/pages/Mine',
      },

      // 数独
      {
        path: '/Sudoku',
        name: '数独',
        component: '@/pages/Sudoku',
        icon: 'TableOutlined',
      },

      // 计划
      {
        path: '/Plan',
        name: '计划',
        icon: 'CheckSquareOutlined',
        component: '@/pages/Plan',
      },

      // 测试页面
      {
        path: '/Debug',
        name: '测试页面',
        icon: 'BugOutlined',
        component: '@/pages/Debug',
      },

      // 前端环境配置
      {
        path: '/FrontEnvironment',
        name: '前端环境配置',
        icon: 'FileTextOutlined',
        routes: [
          {
            path: '/FrontEnvironment/Windows',
            name: 'Windows',
            component: '@/pages/FrontEnvironment/Windows',
          },
          {
            path: '/FrontEnvironment/MacOs',
            name: 'MacOs',
            component: '@/pages/FrontEnvironment/MacOs',
          },
          {
            path: '/FrontEnvironment/Resources',
            name: '资源下载',
            component: '@/pages/FrontEnvironment/Resources',
          },
        ],
      },

      // 工具包
      {
        path: '/WebTools',
        name: '工具包',
        icon: 'ToolOutlined',
        routes: [
          {
            path: '/WebTools/PxToRem',
            name: 'PxToRem',
            component: '@/pages/WebTools/PxToRem',
          },
        ],
      },

      // 算法
      {
        name: '算法',
        icon: 'HourglassOutlined',
        routes: [
          {
            path: '/Algorithm/Sort',
            name: '排序',
            component: '@/pages/Algorithm/Sort/index',
          },
        ],
      },
    ],
  },
];

export { routes };
export default routes;
