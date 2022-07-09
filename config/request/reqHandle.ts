import { RequestInterceptor } from 'umi-request';
import { mutate } from 'swr';

const requestHandler: RequestInterceptor = (url, options, loadding = false) => {
  const { method, headers = {} } = options;

  switch (method) {
    case 'POST':
      headers['Content-Type'] = 'application/json';
      break;

    default:
      break;
  }

  // 开启 loadding
  if (loadding) mutate('/loadding', true, false);

  return {
    url,
    options,
  };
};

export default requestHandler;
