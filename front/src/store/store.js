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
        error: null,   
    },
  
    getters : {
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        },
        user(state){
            return state.user
        }
    },

    mutations : {
        setLoadingM(state, payload) {
            state.loading = payload
        },
        setErrorM(state,payload){
            stete.error = payload
        },
        clearErrorM(state){
            state.error=null
        },
        setUserM(state, payload){
            state.user = payload
        }                  
    },
  
    actions : {
        setLoading({commit},payload){
            commit('setLoadingM',payload)
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
                        commit('setUserM',newUser)
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
        },
        signIn({commit},payload){
            let loginUser={
                name:payload.name,
                email:payload.email,
                userId:null
            }
            firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
            .then(user=>{
                console.log('login')
                loginUser.userId=user.uid
                commit('setUserM',loginUser)
            })
            .catch(error=>{
                console.log(error)
            })

        },
        logout({commit}){
            firebase.auth().signOut()
            commit('setUserM',null)
        }
    },
    modules: {

    }
  
  })
  