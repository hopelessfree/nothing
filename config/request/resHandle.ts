import { ResponseInterceptor } from 'umi-request';
import { mutate } from 'swr';

const responseHandle: ResponseInterceptor = async (response, options) => {
  const result = await response.clone().json();

  result;

  // 关闭 loadding
  mutate('/loadding', false, false);

  return result;
};

export default responseHandle;
