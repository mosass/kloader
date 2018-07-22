import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'create-download-page',
      component: require('@/components/CreateDownloadPage').default
    },
    {
      path: '/download',
      name: 'download-page',
      component: require('@/components/DownloadPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
