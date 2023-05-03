<script setup lang="ts">
import { BookingStatusEnum, type Booking } from '#/bookings'
import type { Checking } from '#/checking'
import type { Room } from '#/rooms'
import { useServices } from '@/composables/useServices'
import { ref, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const { bookingApi, roomsApi, checkingApi } = useServices()
const route = useRoute();
const router = useRouter()

const booking: Ref<Booking | null> = ref(null)
const room: Ref<Room | null> = ref(null)
const checking: Ref<Checking | null> = ref(null)


bookingApi
  .getBookingById({ id: Number(route.params.id) })
  .then((response) => (booking.value = response,
    roomsApi
      .getRoomById({ id: response?.roomId ?? 0 })
      .then((response) => (room.value = response))
      .catch((error) => console.log(error))))
  .catch((error) => console.log(error))

checkingApi.getCheckingById({ bookingId: Number(route.params.id) })
  .then((response) => (checking.value = response))
  .catch((error) => console.log(error))

const deleteBooking = (): void => {
  bookingApi.cancelBooking({ id: Number(route.params.id) })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
  router.go(0)
}

const checkIn = (): void => {
  checkingApi.checkinToRooms({ bookingId: Number(route.params.id) })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
  router.go(0)
}

const checkOut = (): void => {
  checkingApi.checkoutFromRooms({ bookingId: Number(route.params.id) })
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
          <p class="card-text">
            Total Price: {{ booking == null ? "Loading..." : booking.price }}<br />
            Room number: {{ booking == null ? "Loading..." : booking.roomId }} <br />
            Start date: {{ booking == null ? "Loading..." : booking.startDate }} <br />
            End date: {{ booking == null ? "Loading..." : booking.endDate }} <br />
            Status: {{ booking == null ? "Loading..." : booking.status }} <br />
            Checked-in: {{ checking == null ? "Loading..." : checking.checkInAt }} <br />
            Checked-out: {{ checking == null ? "Loading..." : checking.checkOutAt }} <br />
            Code: {{ checking == null ? "Loading..." : (checking.checkInAt == undefined ? "Check in to see the code" :
              checking.code) }} <br /> <br />

          <h5>Room info: </h5>
          Price per night: {{ room == null ? "Loading..." : room.price }} <br />
          Max number of guests: {{ room == null ? "Loading..." : room.guestsMaxNumber }}</p>

          <div class="d-flex justify-content-between mt-3">
            <div>
              <button type="button" :disabled="checking?.checkInAt !== undefined" @click="checkIn()"
                class="btn btn-primary m-1">Check in</button>
              <button type="button" :disabled="checking?.checkInAt == undefined || checking?.checkOutAt !== undefined"
                @click="checkOut()" class="btn btn-primary m-1">Check out</button>
            </div>

            <button type="button"
              :disabled="booking?.status == BookingStatusEnum.CANCELLED || checking?.checkInAt !== undefined || checking?.checkOutAt !== undefined"
              @click="deleteBooking()" class="btn btn-secondary m-1"> Cancel booking </button>
          </div>

        </div>
      </div>


    </div>
  </div></template>
