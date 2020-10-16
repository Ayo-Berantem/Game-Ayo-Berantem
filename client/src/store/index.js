import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [{ username: '', health: 100 }, { username: '', health: 100 }],
    isRoomFull: false
  },
  mutations: {
    'SOCKET_SEND_PLAYERS' (state, payload) {
      state.players = payload
    },
    'SOCKET_SEND_PLAYERS_FULL' (state) {
      state.isRoomFull = true
    },
    'SOCKET_SEND_LEFT_ROOM' () {
      router.push({ name: 'Login' })
    },
    'SOCKET_PLAYER_WIN' (state, payload) {
      router.push({ name: 'Winner', params: { username: payload } })
    },
    'SOCKET_userConnect'(state, data) {
      state.users = data
    },
    'SOCKET_sendHealth' (state, data) {
      state.users = data
    }
  },
  actions: {
  },
  modules: {
  }
})
