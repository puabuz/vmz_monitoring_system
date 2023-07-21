import {createStore} from 'vuex';


const state = {
  user: null,
  userId: null
};

const store = createStore({
  state,
  getters: {
    // Получаем юзера
    getUser: (state) => {
      return state.user;
    },
    // Получаем ID юзера
    getUserId:(state) => {
      return state.userId
    }
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
    userId(context, userId){
      context.commit("userId", userId);
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    userId(state, userId) {
      state.userId = userId; 
    }
  },
});

export default store;
