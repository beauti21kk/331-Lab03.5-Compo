import { createRouter, createWebHistory } from 'vue-router'
import PassengerListView from '../views/PassengerListView.vue'
import PassengerLayoutView from '@/views/Passenger/PassengerLayoutView.vue'
import PassengerDetailView from '@/views/Passenger/PassengerDetailView.vue'
import AirlineDetailView from '@/views/Passenger/AirlineDetailView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PassengerList',
      component: PassengerListView,
      props: (route) => ({page: parseInt(route.query.page as string || '1')})
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/Passenger/:id',
      component: PassengerLayoutView,
      props: true,
      children: [
        {
          path: 'PassengerDetail',
          name: 'passenger-detail',
          component: PassengerDetailView,
          props: true
        },
        {
          path: 'AirlineDetail',
          name: 'airline-detail',
          component: AirlineDetailView,
          props: true 

        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    { 
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    }
  ]
})

export default router
