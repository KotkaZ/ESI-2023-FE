<script setup lang="ts">
import type { Booking } from '#/bookings'
import { useServices } from '@/composables/useServices'
import { ref, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const { bookingApi } = useServices()
const route = useRoute();
const router = useRouter()

const booking: Ref<Booking | null> = ref(null)
const startDate = ref('')
const endDate = ref('')
const available: Ref<boolean> = ref(false)

bookingApi
  .getBookingById({ id: Number(route.params.id) })
  .then((response) => (booking.value = response))
  .catch((error) => console.log(error))


const deleteBooking = (): void => {
  bookingApi.cancelBooking({ id: Number(route.params.id) })
  router.go(0)
}


</script>

<template>
  <div class="row">
    <div class="mx-auto col-8 col-md-5 col-lg-3">
      <h3>Edit booking</h3>
      <div class="card bg-light">
        <div class="card-body">
          <h5 class="card-title">{{ booking == null ? "Loading..." : "Room number: " + booking.roomId }}</h5>
          <p class="card-text">Price per night: {{ booking == null ? "Loading..." : booking.price }}<br /> Start date: {{
            booking == null ? "Loading..." : booking.startDate }} <br />
            End date: {{ booking == null ? "Loading..." : booking.endDate }} <br /> Status: {{ booking == null ?
              "Loading..." : booking.status }}</p>

          <div class="d-flex justify-content-between mt-3">
            <button type="button" @click="deleteBooking()" class="btn btn-secondary">
              Cancel booking
            </button>
          </div>

        </div>
      </div>


    </div>
  </div>
</template>
