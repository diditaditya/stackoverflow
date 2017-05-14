import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import PostQuestion from '@/components/PostQuestion'
import Thread from '@/components/Thread'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/postQuestion',
      name: 'PostQuestion',
      component: PostQuestion
    },
    {
      path: '/thread/:index',
      name: 'Thread',
      component: Thread,
      props: true
    }
  ]
})
