export default {
  namespace: 'customer',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
