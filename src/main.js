// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.css'

import App from './App'
import router from './router'
import store from './store'

// Firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
// Dont need it
// import 'firebase/messaging'
// import 'firebase/storage'

Vue.use(
  Vuelidate,
  Uimini
)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // Configuration
    var config = {
      apiKey: 'AIzaSyArmpPdT-yHnEnkQzhoB_m6N6XEFoZ5Ep0',
      authDomain: 'film-library-54afe.firebaseapp.com',
      databaseURL: 'https://film-library-54afe.firebaseio.com',
      projectId: 'film-library-54afe',
      storageBucket: 'film-library-54afe.appspot.com',
      messagingSenderId: '409354035794',
      appId: '1:409354035794:web:985d9a0dd2cbfd9698b58b',
      measurementId: 'G-J51WQ3N2HF'
    }
    // Firebase Initialize
    firebase.initializeApp(config)

    // Auth Check
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Check Logged
        this.$store.dispatch('loggedUser', user)
      }
      // Loading All Tasks
      this.$store.dispatch('loadTasks')
    })
  }
})
