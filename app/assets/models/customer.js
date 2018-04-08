import { routerRedux } from 'dva/router';
import * as api from '../services/api';

export default {
  namespace: 'customer',

  state: {
    data: {
      filter: {},
      list: [],
      pagination: {},
      detail: {},
    },
  },

  effects: {
    *add({ payload }, { call, put }) {
      const res = yield call(api.customerAdd, payload);
      if (res.code === 0) {
        yield put(routerRedux.push('/customer/list'));
      }
    },
    *fetchList({ payload }, { call, put }) {
      const res = yield call(api.customerFetchList, payload);
      if (res.code === 0) {
        yield put({
          type: 'setList',
          payload: res.data,
        });
      }
    },
  },

  reducers: {
    setList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
