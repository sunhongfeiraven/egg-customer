import request from '../utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/user/login', {
    method: 'POST',
    body: params,
  });
}

export async function customerAdd(params) {
  return request('/api/customer/add', {
    method: 'POST',
    body: params,
  });
}

export async function customerFetchList(params) {
  return request('/api/customer/fetch/list', {
    method: 'POST',
    body: params,
  });
}

export async function customerFetchDetail(params) {
  return request('/api/customer/fetch/detail', {
    method: 'POST',
    body: params,
  });
}
