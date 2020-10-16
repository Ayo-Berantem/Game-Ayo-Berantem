import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
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
    }
  },
  actions: {
  },
  modules: {
  }
})
