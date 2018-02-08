import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import request from 'request'

Vue.use(Vuex)



export const store = new Vuex.Store({
    state: {
        loading: false      
    },
  
    getters : {
        loading (state) {
            return state.loading
        }  
    },

    mutations : {
        setLoading(state, payload) {
            state.loading = payload
        },                  
    },
  
    actions : {
        actGifTitle({commit},payload){
            commit('setGifTitle',payload)
        },
        setLoadings({commit},payload){
            commit('setLoading',payload)
        }
    },
    modules: {

    }
  
  })
  