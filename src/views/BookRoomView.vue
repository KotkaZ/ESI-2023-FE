<script setup lang="ts">
import type { Room } from '#/rooms'
import { useServices } from '@/composables/useServices'
import { ref, type Ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter, useRoute } from 'vue-router'
const { roomsApi, bookingApi } = useServices()
import { BookingCreateStatusEnum, type BookingCreate } from '#/bookings/models';
const route = useRoute();
const router = useRouter()
const { userId } = useAuth()

const room: Ref<Room | null> = ref(null)
const startDate = ref('')
const endDate = ref('')
const available: Ref<boolean> = ref(false)

roomsApi
  .getRoomById({ id: Number(route.params.id) })
  .then((response) => (room.value = response))
  .catch((error) => console.log(error))

const bookRoom = (roomid:any, roomPrice:any): void => {
  var diff = new Date(endDate.value).valueOf() - new Date(startDate.value).valueOf();
  var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
  
  const bookingDetails: BookingCreate = {
        userId: userId,
        roomId: roomid,
        status: BookingCreateStatusEnum.CREATED,
        startDate: new Date(startDate.value),
        endDate: new Date(endDate.value),
        bookDate: new Date(),
        price: diffDays*roomPrice
      }

  bookingApi
    .createBooking({bookingCreate: bookingDetails})
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
}

const checkAvailability = (): void => {
  bookingApi
    .getRoomAvailability({ startDate: new Date(startDate.value), endDate: new Date(endDate.value), roomId: Number(route.params.id) })
    .then((response) => available.value = response)
    .catch((error) => console.log(error))
}

</script>

<template>
  <div class="row">
    <div class="mx-auto col-8 col-md-5 col-lg-3">
      <h3>View room details</h3>
      <div class="card bg-light">
        <div class="card-body">
          <h5 class="card-title">{{ room == null ? "Loading..." : room.description }}</h5>
          <p class="card-text">
            Price per night: {{ room == null ? "Loading..." : room.price }} <br /> 
            Max number of guests: {{ room == null ? "Loading..." : room.guestsMaxNumber }}</p>

          <div class="form-group">
            <label for="exampleInputEmail1">Start:</label>
            <input type="date" class="form-control" required v-model="startDate">

          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">End:</label>
            <input type="date" class="form-control" required v-model="endDate">
          </div>
          <button type="button" @click="checkAvailability()" class="btn btn-primary mt-2">Check availability</button>

          <div>Is the room available: {{ available }}</div>
          <button type="button" :disabled="!available" @click="bookRoom(room?.roomNumber, room?.price)" class="btn btn-primary mt-2"> Book</button>
        </div>
      </div>


    </div>
  </div>
</template>
