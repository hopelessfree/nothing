import { BasicLayoutProps } from '@ant-design/pro-layout';
import { Link } from 'umi';
import routes from '../../../config/routes';
import { createElement } from 'react';
import * as Icons from '@ant-design/icons';
import { Avatar } from 'antd';
import './index.less';

// 将字符串 icon 转化为真实的 reactElement
routes[1].routes.forEach(
  (item) => item.icon && (item.icon = createElement(Icons[item.icon])),
);

const layoutProps: BasicLayoutProps = {
  title: 'Person-XXXX',
  logo: false,
  navTheme: 'light',
  fixSiderbar: true,
  fixedHeader: true,
  route: {
    routes: routes[1].routes,
  },

  style: {
    position: 'relative',
  },

  menuHeaderRender: (_, title) => <Link to="/">{title}</Link>,
  menuItemRender: (item, dom) => <Link to={item.path || '/'}>{dom}</Link>,
  rightContentRender: () => (
    <div className="Info">
    </div>
  ),
};

export default layoutProps;
export { layoutProps };
