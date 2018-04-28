import { routerRedux } from 'dva/router';
import * as api from '../services/api';

export default {
  namespace: 'project',

  state: {
    detail: {},
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
        yield put({
          type: 'setList',
          payload: res.data,
        });
      }
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
        yield put({
          type: 'fetchList',
          payload: {},
        });
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
    setDetail(state, action) {
      return { ...state, detail: action.payload };
    },
  },
};
