import ProLayout from '@ant-design/pro-layout';
import Loadding from '@/components/Loading';
import { FC, ReactElement } from 'react';
import { layoutProps } from './config';
import { useLoadding } from '@/data/useLoadding';
import { history } from 'umi';
import './index.less';

const Index: FC<any> = (props): ReactElement => {
  const { children } = props;
  const { data: loadding } = useLoadding();
  const { location } = history;

  return (
    <ProLayout
      {...layoutProps}
      location={{
        pathname: location.pathname,
      }}
    >
      {/* 请求加载 loadding */}
      {loadding && <Loadding />}

      {children}
    </ProLayout>
  );
};

export default Index;
