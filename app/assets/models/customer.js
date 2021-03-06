import { routerRedux } from 'dva/router';
import * as api from '../services/api';

export default {
  namespace: 'customer',

  state: {
    detail: {},
    projects: [],
    filter: {
      current: 1,
    },
    targetKeys: [],
    list: [],
    page: {
      current: 1,
      total: 0,
      pageSize: 10,
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
        yield put({ type: 'setList', payload: res.data });
        yield put({ type: 'setFilter', payload });
      }
    },
    *fetchListFromStore(_, { call, select }) {
      const filter = yield select(({ customer }) => customer.filter);
      yield call({ type: 'fetchList', payload: filter });
    },
    *fetchDetail({ payload }, { call, put }) {
      const res = yield call(api.customerFetchDetail, payload);
      if (res.code === 0) {
        yield put({
          type: 'setDetail',
          payload: res.data,
        });
      }
      return yield res;
    },
    *update({ payload }, { call, put }) {
      const res = yield call(api.customerUpdate, payload);
      if (res.code === 0) {
        yield put(routerRedux.push('/customer/list'));
      }
    },
    *delete({ payload }, { call, put }) {
      const res = yield call(api.customerDelete, payload);
      if (res.code === 0) {
        yield put({ type: 'fetchListFromStore' });
      }
    },
    *fetchProjects({ payload }, { call, put }) {
      const res = yield call(api.projectFetchAll, payload);
      if (res.code === 0) {
        yield put({ type: 'setProjects', payload: res.data });
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
    setProjects(state, action) {
      return { ...state, projects: action.payload };
    },
    transferChange(state, action) {
      return { ...state, targetKeys: action.payload };
    },
  },
};
