import { request } from 'umi';

export function requestTimeout() {
  return request('http://localhost');
}
