import Vue from 'vue'
import Router from 'vue-router'
import Forum from '@/components/Forum'
import Signin from '@/components/user/Signin'
import Signup from '@/components/user/Signup'
import Profile from '@/components/user/Profile'
import Home from '@/components/Home'
import Loading from '@/components/Loading'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forum',
      name: 'Forum',
      component: Forum
    },
    {
      path: '/Signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/Loading',
      name: 'Loading',
      component: Loading
    },
  ],
})