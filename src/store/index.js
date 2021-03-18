import Vue from 'vue';
import Vuex from 'vuex';
import cookie from '@/util/cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    userInfo: cookie.getUserInfo(),
    menuRoutes: [],
    selectedKeys: [],
    productList: [],
    categoryList: [],
    pagination: {
      total: 0,
      pageSize: 10,
      current: 1,
    },
    searchForm: {
      searchWord: '',
      category: '',
    },
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    removeUserInfo(state) {
      state.userInfo = {};
    },
    setMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
    changeSelectedKeys(state, keys) {
      state.selectedKeys = keys;
    },
    setProductList(state, datas) {
      state.productList = datas;
    },
    setTotalPage(state, num) {
      state.pagination.total = num;
    },
    setCategoryList(state, datas) {
      state.categoryList = datas;
    },
    setCurrent(state, num) {
      state.pagination.current = num;
    },
    setSearchWord(state, val) {
      state.searchForm.searchWord = val;
    },
    setCategory(state, val) {
      state.searchForm.category = val;
    },
  },
  actions: {
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      cookie.setUserInfo(userInfo);
    },
    removeUserInfo({ commit }) {
      commit('removeUserInfo');
      cookie.removeUserInfo();
    },
    setMenuRoutes({ commit }, routes) {
      commit('setMenuRoutes', routes);
    },
    async setProductList({ state, commit }, params) {
      const datas = await Vue.prototype.$api.getProductions({
        searchWord: state.searchForm.searchWord,
        category: state.searchForm.category,
        page: state.pagination.current,
        size: state.pagination.pageSize,
        ...params,
      });
      const productList = datas.data.data.map((item) => {
        for (let i = 0; i < state.categoryList.length; i += 1) {
          const category = state.categoryList[i];
          if (item.category === category.id) {
            return {
              ...item,
              categoryName: category,
              key: item.id,
            };
          }
        }
        return {
          ...item,
          key: item.id,
        };
      });
      commit('setProductList', productList);
      commit('setCurrent', (params && params.page) || state.pagination.current);
      commit('setTotalPage', datas.data.total);
    },
    async setCategoryList({ commit }, params) {
      const datas = await Vue.prototype.$api.getCategory(params);
      commit('setCategoryList', datas.data.data);
    },
  },
  modules: {
  },
});
