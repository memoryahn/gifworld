import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as firebase from 'firebase'
// import request from 'request'

Vue.use(Vuex)



export const store = new Vuex.Store({
    state: {
        loading: false,
        user: null,      
    },
  
    getters : {
        loading (state) {
            return state.loading
        },
        user(state){
            return state.user
        }
    },

    mutations : {
        setLoading(state, payload) {
            state.loading = payload
        },
        setUser(state, payload){
            state.user = payload
        }                  
    },
  
    actions : {
        setLoadings({commit},payload){
            commit('setLoading',payload)
        },
        signUp({commit},payload){
            let newUser={
                name:payload.name,
                email:payload.email,
                userId:null
            }
            firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
            .then(
                user=>{
                    let userId=user.uid
                    newUser.userId=userId
                    firebase.database().ref(/users/+userId+'/').set(newUser)
                    .then(()=>{
                        commit('setUser',newUser)
                        console.log('signup user')
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
                }
            )
            .catch((error)=>{
                console.log(error)
            })
        }

    },
    modules: {

    }
  
  })
  