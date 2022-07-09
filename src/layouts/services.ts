import { request } from 'umi';
import { message } from 'antd';

/**
 * 登录
 * @param data
 * @returns
 */
export function login(params: { username: string; password: string }) {
  return request('/login', { params })
    .then((res) => {
      const { data } = res;
      if (data) {
        message.success('登陆成功');
      } else {
        message.error('登陆失败');
      }

      return data ? Promise.resolve(res) : Promise.reject(res);
    })
    .catch(() => Promise.reject({ data: false }));
}
