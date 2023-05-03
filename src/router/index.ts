import { createRouter, createWebHistory } from 'vue-router'
import BookView from '@/views/BookView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import SupportView from '@/views/SupportView.vue'
import RoomView from '@/views/RoomView.vue'
import MyBookingsView from '@/views/MyBookingsView.vue'
import BookingView from '@/views/BookingView.vue'
import { Role, useAuth } from '@/composables/useAuth'

const { hasRoleOf } = useAuth()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'book',
      component: BookView
    },
    {
      path: '/rooms/:id',
      name: 'room',
      component: RoomView
    },
    {
      path: '/bookings',
      name: 'mybookings',
      component: MyBookingsView
    },
    {
      path: '/bookings/:id',
      name: 'booking',
      component: BookingView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/support',
      name: 'support',
      component: SupportView,
      beforeEnter: () => {
        return hasRoleOf(Role.ADMIN)
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    }
  ]
})

router.beforeEach(async (to) => {
  const { isAuthenticated } = useAuth()
  const authenticated = await isAuthenticated()

  if (!authenticated && to.name !== 'Login' && to.name !== 'Signup') {
    return { name: 'Login' }
  }
})

export default router
