<script setup lang="ts">
import type { Booking } from '#/bookings'
import { useAuth } from '@/composables/useAuth'
import { useServices } from '@/composables/useServices'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
const { userId } = useAuth()
const { bookingApi } = useServices()

const bookings: Ref<Booking[]> = ref([])
const router = useRouter()

bookingApi
  .getBookingsByUser({ userId })
  .then((response) => (bookings.value = response))
  .catch((error) => console.log(error))

const clickDetails = (number: any): void => {
  router.push('/bookings/' + number)
}
</script>

<template>
  <div>
    <h1 class="m-3">My bookings</h1>
    <ul class="m-0 p-0">
      <div class="" v-for="booking in bookings" :key="booking.id">
        <div class="card m-5 bg-light">
          <div class="card-body">
            <h5 class="card-title"> Booking id: {{ booking.id }}</h5>
            <p class="card-text">Room number: {{ booking.roomId }} <br /> Price per night: {{ booking.price }} <br />
              Start date: {{ booking.startDate }} <br />
              End date: {{ booking.endDate }} <br /> Status: {{ booking.status }}</p>
            <button type="button" @click="clickDetails(booking.id)" class="btn btn-primary">Details</button>
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>
