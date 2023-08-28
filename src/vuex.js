import {createStore} from 'vuex';


const state = {
  user: null,
  userId: null,
  isAdmin: false
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
    },
    // Является ли пользователь администратором
    getUserIsAdmin:(state) => {
      return state.isAdmin
    }
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
    userId(context, userId){
      context.commit("userId", userId);
    },
    isAdmin(context, isAdmin) {
      context.commit("isAdmin", isAdmin)
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    userId(state, userId) {
      state.userId = userId; 
    },
    isAdmin(state, isAdmin) {
      state.isAdmin = isAdmin
    }
  },
});

export default store;
