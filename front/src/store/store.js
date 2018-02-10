import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as firebase from 'firebase'
import router from '../router/index'
// import request from 'request'

Vue.use(Vuex)



export const store = new Vuex.Store({
    state: {
        loading: false,
        user: null, 
        loginError:null,  
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
        },
        loginError(state){
            return state.loginError
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
        },
        setLoginErrorM(state,payload){
            state.loginError = payload
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
                    firebase.database().ref('/users/'+userId+'/').set(newUser)
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
                commit('setLoginErrorM',error.message)
            })
        },
        signIn({commit},payload){
            commit('setLoadingM',true)
            let loginUser={
                name:payload.name,
                email:payload.email,
                userId:null
            }
            firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
            .then(user=>{
                loginUser.userId=user.uid
                commit('setUserM',loginUser)
                commit('setLoadingM',false)
            })
            .catch(error=>{
                commit('setLoginErrorM',error.message)
                commit('setLoadingM',false)
            })
        },
        autoSignIn({commit},payload){
            var user={
                userId: payload.uid,
                email:payload.email,
                name:payload.displayName,
            }
            firebase.database().ref('/users/'+payload.uid+'/').set(user)
                    .then(()=>{
                        commit('setUserM',user)
                        commit('setLoadingM',false)
                        router.push('/')
                    })
                    .catch((error)=>{
                        console.log(error)
                        commit('setLoadingM',false)
                        router.push('/')
                    })
            console.log('autoSignIn')
        },
        logout({commit}){
            firebase.auth().signOut()
            commit('setUserM',null)
        }
    },
    modules: {

    }
  
  })
  