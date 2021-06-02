import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)
import store from '@/store'
import helper from '../helpers/authentification'

const checkLogin = () => {
  const user = helper()
  if (user && user.id) {
    store.commit('SET_USER', user)
    store.commit('SET_IS_LOGGED', true)
  }
}

const routes = [
  {
    path: '/',
    component: () => import('@/views/Dashboard.vue'),
    name: 'dashboard',
    props: true,
    beforeEnter: (to, from, next) => {
      checkLogin()
      if (store.state.isLogged) {
        next();
      } else {
        next({ name: 'signIn' });
      }
    },
  },
  {
    path: '/newtask',
    name: 'addnewtask',
    component: () => import('@/views/CreateNewTask.vue'),
    beforeEnter: (to, from, next) => {
      checkLogin()
      if (store.state.isLogged) {
        next();
      } else {
        next({ name: 'signIn' });
      }
    }
  },

  {
    path: '/signIn',
    name: 'signIn',
    component: () => import('@/views/SignIn.vue'),
    props: true
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import('@/views/SignUp.vue'),
    props: true
  },
  {
    path: '*',
    redirect: '/',
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
