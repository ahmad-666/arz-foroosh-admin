import authGetters from './auth/getters';
import authMutations from './auth/mutations';
import authActions from './auth/actions';

export const state = () => {
  return {
    loading: false,
    success: '',
    error: '',
    token: null,
    userId: null,
    expireDate: null,
  };
};
export const getters = authGetters;
export const mutations = authMutations;
export const actions = authActions;
