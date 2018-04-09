/* global localStorage */

import User from '@/models/User';
import * as MutationTypes from '@/store/mutationTypes';

const state = {
  user: User.from(localStorage.token),
};

const mutations = {
  [MutationTypes.LOGIN]() {
    state.user = User.from(localStorage.token);
  },
  [MutationTypes.LOGOUT]() {
    state.user = null;
  },
};

const getters = {
  currentUser() {
    return state.user;
  },
};

const actions = {
  login({ commit }) {
    commit(MutationTypes.LOGIN);
  },

  logout({ commit }) {
    commit(MutationTypes.LOGOUT);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
