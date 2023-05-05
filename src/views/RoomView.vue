<script setup lang="ts">
import type { Room } from '#/rooms'
import { useServices } from '@/composables/useServices'
import { ref, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const { roomsApi } = useServices()
const route = useRoute();
const router = useRouter()

const roomNumber = ref()
const description = ref()
const price = ref()
const guestsMaxNumber = ref()


route.params.id !== undefined ? roomsApi
  .getRoomById({ id: Number(route.params.id) })
  .then((response) => (roomNumber.value = response.roomNumber, description.value = response.description, price.value = response.price, guestsMaxNumber.value = response.guestsMaxNumber))
  .catch((error) => console.log(error))
  : null



const createRoom = (): void => {

  const roomDetails: Room = {
    roomNumber: roomNumber.value,
    description: description.value,
    price: price.value,
    guestsMaxNumber: guestsMaxNumber.value
  }

  roomsApi
    .createRoom({ room: roomDetails })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
  router.push('/')
}

const editRoom = (): void => {

  const roomDetails: Room = {
    roomNumber: roomNumber.value,
    description: description.value,
    price: price.value,
    guestsMaxNumber: guestsMaxNumber.value
  }

  roomsApi
    .editRoom({ id: roomNumber.value, room: roomDetails })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
  router.push('/')
}


</script>

<template>
  <div class="row">
    <div class="mx-auto col-8 col-md-5 col-lg-3">
      <h3 v-if="!route.params.id">Create new room</h3>
      <h3 v-if="route.params.id">Edit room</h3>
      <div class="card bg-light">
        <div class="card-body">

          <div class="form-group">
            <label>Room number:</label>
            <input type="number" class="form-control" required v-model="roomNumber">
          </div>
          <div class="form-group">
            <label>Description:</label>
            <input type="text" class="form-control" required v-model="description">
          </div>
          <div class="form-group">
            <label>Price:</label>
            <input type="float" class="form-control" required v-model="price">
          </div>
          <div class="form-group">
            <label>Max number of guests:</label>
            <input type="number" class="form-control" required v-model="guestsMaxNumber">
          </div>

          <button type="button" v-if="!route.params.id" @click="createRoom()" class="btn btn-primary mt-2">
            Create room</button>
          <button type="button" v-if="route.params.id" @click="editRoom()" class="btn btn-primary mt-2">
            Edit room</button>
        </div>
      </div>


    </div>
  </div>
</template>
