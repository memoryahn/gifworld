import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



export const store = new Vuex.Store({
    state: {
        gifTitle: [],
        gifUrls: [],
        gifNumber: [],
        gifDate: [],
        loading: false      
    },
  
    getters : {
        gifTitle (state) {
            return state.gifTitle
        },
        gifUrls (state) {
            return state.gifUrls
        },
        gifNumber (state) {
            return state.gifNumber
        },
        gifDate (state) {
            return state.gifDate
        },
        loading (state) {
            return state.loading
        }  
    },

    mutations : {
        setGifTitle(state, payload) {
            state.gifTitle = payload
        },
        setGifUrls(state, payload) {
            state.gifUrls = payload
        },
        setGifNumber(state, payload) {
            state.gifNumber = payload
        },
        setGifDate(state, payload) {
            state.gifDate = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },                  
    },
  
    actions : {
        actGifTitle({commit},payload){
            commit('setGifTitle',payload)
        },
        actGifUrls({commit},payload){
            commit('setGifUrls',payload)
        },
        actGifNumber({commit},payload){
            commit('setGifNumber',payload)
        },
        actGifDate({commit},payload){
            commit('setGifDate',payload)
        },
    },
    modules: {

    }
  
  })
  