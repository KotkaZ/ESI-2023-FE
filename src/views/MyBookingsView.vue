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

const clickDetails = (): void => {
  // router.push('/rooms/' + number)
}
</script>

<template>
  <div class="">
    <div>
      <h1 class="m-3">My bookings</h1>
      <ul class="m-0 p-0">
        <div class="" v-for="booking in bookings" :key="booking.id">
          <div class="card m-5 bg-light">
            <div class="card-body">
              <h5 class="card-title">{{ booking.bookDate }}</h5>
              <p class="card-text">Price per night:</p>
              <p class="card-text"></p>
              <button type="button" @click="clickDetails()" class="btn btn-primary">Details</button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>
