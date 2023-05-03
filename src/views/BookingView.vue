<script setup lang="ts">
import type { Booking } from '#/bookings'
import type { Room } from '#/rooms'
import { useServices } from '@/composables/useServices'
import { ref, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const { bookingApi, roomsApi } = useServices()
const route = useRoute();
const router = useRouter()

const booking: Ref<Booking | null> = ref(null)
const room: Ref<Room | null> = ref(null)
const roomNumber = ref(0)

bookingApi
  .getBookingById({ id: Number(route.params.id) })
  .then((response) => (booking.value = response,
    roomsApi
      .getRoomById({ id: response?.roomId ?? 0 })
      .then((response) => (room.value = response))
      .catch((error) => console.log(error))))
  .catch((error) => console.log(error))


const deleteBooking = (): void => {
  bookingApi.cancelBooking({ id: Number(route.params.id) })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
  router.go(0)
}


</script>

<template>
  <div class="row">
    <div class="mx-auto col-8 col-md-5 col-lg-6">
      <h3>Booking details</h3>
      <div class="card bg-light">
        <div class="card-body">
          <h5 class="card-title"> {{ room == null ? "Loading..." : room.description }} </h5>
          <p class="card-text">Total Price: {{ booking == null ? "Loading..." : booking.price }}<br /> {{ booking == null
            ? "Loading..." : "Room number: " + booking.roomId }} <br />
            Start date: {{ booking == null ? "Loading..." : booking.startDate }} <br />
            End date: {{ booking == null ? "Loading..." : booking.endDate }} <br /> Status: {{ booking == null ?
              "Loading..." : booking.status }} <br /> <br /> 
              
            <h5>Room info: </h5>
            Price per night: {{ room == null ? "Loading..." : room.price }} <br />
            Max number of
            guests: {{ room == null ? "Loading..." : room.guestsMaxNumber }}</p>

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
