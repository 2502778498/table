import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import filter from '@/components/filter'
import form from '@/components/form'
import page from '@/components/page'
import zhiling from '@/components/zhiling'
// import promise from '@/components/promise'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/qq',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/filter',
      name: 'filter',
      component: filter
    },
    {
      path: '/form',
      name: 'form',
      component: form
    },
    {
      path: '/page',
      name: 'page',
      component: page
    },
    {
      path: '/',
      name: 'zhiling',
      component: zhiling
    }
    // {
    //   path: '/promise',
    //   name: 'promise',
    //   component: promise
    // }
  ]
})
