import { createRouter, createWebHistory } from 'vue-router'
import PassengerListView from '../views/PassengerListView.vue'
import PassengerLayoutView from '@/views/Passenger/PassengerLayoutView.vue'
import PassengerDetailView from '@/views/Passenger/PassengerDetailView.vue'
import AirlineDetailView from '@/views/Passenger/AirlineDetailView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import EditDetailView from '@/views/Passenger/EditDetailView.vue'
import NProgress from 'nprogress'
import PassengerService from '@/services/PassengerService'
import { usePassengerStore } from '@/stores/passenger'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PassengerList',
      component: PassengerListView,
      props: (route) => ({ page: parseInt(route.query.page as string || '1') })
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
      beforeEnter: (to) => {
        // <-- put API call here
        const id: number = parseInt(to.params.id as string)
        const passengerStore = usePassengerStore()
        return PassengerService.getPassengerById(id)
          .then((response) => {
            // need to set up the data for the component
            passengerStore.setPassenger(response.data)
            PassengerService.getAirlineById(Number(response.data.airlineId))
              .then((response2) => {
                passengerStore.setAirline(response2.data)
              })
              .catch((error) => {
                console.log(error)
                if (error.response && error.response.status === 404) {
                  router.push({ name: '404-resource', params: { resource: 'Airline' } })
                } else {
                  router.push({ name: 'network-error' })
                }
              })
          }).catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resorce',
                params: { resource: 'passenger' }
              }
            } else {
              return {
                name: 'network-error'
              }
            }
          })
      },
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
        },
        {
          path: 'EditDetail',
          name: 'edit-detail',
          component: EditDetailView,
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
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()

})

export default router
