// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store'
import * as firebase from 'firebase'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  create() {
    var config = {
      apiKey: "AIzaSyBqRqMQFJ7EgRURSLoFernDmrRDZBxasm4",
      authDomain: "vilios-e3de0.firebaseapp.com",
      databaseURL: "https://vilios-e3de0.firebaseio.com",
      projectId: "vilios-e3de0",
      storageBucket: "vilios-e3de0.appspot.com",
      messagingSenderId: "540966614655"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.$store.dispatch('autoSignIn', user)
        // this.$store.dispatch('fetchUserData')
      }
    })  
  }
})
