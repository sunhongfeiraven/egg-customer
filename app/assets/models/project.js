import { routerRedux } from 'dva/router';
import * as api from '../services/api';

export default {
  namespace: 'project',

  state: {
    detail: {},
    filter: {
      current: 1,
    },
    list: [],
    page: {
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },

  effects: {
    *add({ payload }, { call, put }) {
      const res = yield call(api.projectAdd, payload);
      if (res.code === 0) {
        yield put(routerRedux.push('/project/list'));
      }
    },
    *fetchList({ payload }, { call, put }) {
      const res = yield call(api.projectFetchList, payload);
      if (res.code === 0) {
        yield put({ type: 'setList', payload: res.data });
        yield put({ type: 'setFilter', payload });
      }
    },
    *fetchListFromStore(_, { call, select }) {
      const filter = yield select(({ customer }) => customer.filter);
      yield call({ type: 'fetchList', payload: filter });
    },
    *fetchDetail({ payload }, { call, put }) {
      const res = yield call(api.projectFetchDetail, payload);
      if (res.code === 0) {
        yield put({
          type: 'setDetail',
          payload: res.data,
        });
      }
    },
    *update({ payload }, { call, put }) {
      const res = yield call(api.projectUpdate, payload);
      if (res.code === 0) {
        yield put(routerRedux.push('/project/list'));
      }
    },
    *delete({ payload }, { call, put }) {
      const res = yield call(api.projectDelete, payload);
      if (res.code === 0) {
        yield put({ type: 'fetchListFromStore' });
      }
    },
  },

  reducers: {
    setList(state, action) {
      return {
        ...state,
        list: action.payload.list,
        page: action.payload.page,
      };
    },
    setFilter(state, action) {
      return {
        ...state,
        filter: action.payload,
      };
    },
    setDetail(state, action) {
      return { ...state, detail: action.payload };
    },
  },
};
