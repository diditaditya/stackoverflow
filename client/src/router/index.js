import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import PostQuestion from '@/components/PostQuestion'

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
      component: Login,
      props: {isloggedin: true}
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/postQuestion',
      name: 'PostQuestion',
      component: PostQuestion,
      props: {isloggedin: true}
    }
  ]
})
