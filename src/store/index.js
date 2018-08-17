import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    authObject: {
      token: null
    },
    isAuthenticated: false,
    authWaiting: true,
    baseApiUrl: 'http://accountingapp.test/api/',
    loading: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setIsOwner(state, payload) {
      state.isOwner = payload
    },
    setAuthToken(state, payload) {
      state.authObject.token = payload
    },
    refreshAuthLocal(state) {
      localStorage.removeItem('authObject')
      localStorage.setItem('authObject', JSON.stringify(state.authObject))
    },
    setAuthenticated(state, payload) {
      state.isAuthenticated = payload
    },
    setAuthWaiting(state, payload) {
      state.authWaiting = payload
    }
  },
  getters: {

  },
  actions: {
    setUser({commit}, payload) {
      commit('setUser', payload)
    },
    fetchUser({commit}) {
      let payload = JSON.parse(localStorage.getItem('userObject'))
      store.dispatch('setUser', payload)
    },
    fetchAuthToken({commit}) {
      let payload = JSON.parse(localStorage.getItem('authObject'))
      if (payload) {
        store.dispatch('setAuthToken', payload.token)
      }
    },
    refreshUser({commit}, payload) {
      axios.get('http://accountingapp.test/api/users', {
        headers: {
          'Content-Type': 'application/JSON',
          'Authorization': `Bearer ${payload}`
        }
      }).then(res => {
        commit('setUser', res.data.data)
      })
    },
    verifyAuthToken({commit}, payload) {
      axios.get('http://accountingapp.test/api/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${payload}`
        }
      }).then(res => {
        commit('setUser', res.data.data)
        commit('setAuthenticated', true)
        router.push('/home')
        commit('setAuthWaiting', false)
      }).catch(err => {
        if(err.response) {
          commit('setAuthenticated', false)
          localStorage.removeItem('authObject')
          router.push('/auth')
          commit('setAuthWaiting', false)
        }
      })
    },
    setLoading({commit}, payload) {
      commit('setLoading', payload)
    },
    setAuthToken({commit}, payload) {
      commit('setAuthToken', payload)
    },
    setAuthLocal({commit}) {
      commit('refreshAuthLocal')
    }
  }
})
