import request from '../utils/request';

export async function queryCurrent(params) {
  return request('/api/user/fetch', {
    method: 'POST',
    body: params,
  });
}
