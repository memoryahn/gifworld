// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import { store } from './store/store'
import * as firebase from 'firebase'
var SimpleVueValidation = require('simple-vue-validator')

Vue.use(SimpleVueValidation);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    var config = {
      apiKey: "AIzaSyBTmupRNEQFNazgY0zal6BenOI5fJ1uj0Q",
      authDomain: "gifworld-1.firebaseapp.com",
      databaseURL: "https://gifworld-1.firebaseio.com",
      projectId: "gifworld-1",
      storageBucket: "gifworld-1.appspot.com",
      messagingSenderId: "770310291191"
    };
    console.log('firebase on')
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.$store.dispatch('autoSignIn', user)
        // this.$store.dispatch('fetchUserData')
      }
    })  
  }
})
