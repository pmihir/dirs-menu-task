import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // Each of these routes are loaded asynchronously, when a user first navigates to each corresponding endpoint.
    // The route will load once into memory, the first time it's called, and no more on future calls.
    // This behavior can be observed on the network tab of your browser dev tools.
    {
      path: '/',
      name: 'dashboard',
      component: function (resolve) {
        require(['../views/dashboard.vue'], resolve)
      }
    },
    {
      path: '/menu',
      name: 'menu',
      component: function (resolve) {
        require(['../views/addEditMenu.vue'], resolve)
      }
    }
  ]
})

export default router
