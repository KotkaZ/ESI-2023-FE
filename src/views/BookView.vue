<script setup lang="ts">
import type { Room } from '#/rooms'
import { useServices } from '@/composables/useServices'
import { useAuth, Role } from '@/composables/useAuth'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
const { roomsApi } = useServices()
const { userId, hasRoleOf } = useAuth()

const rooms: Ref<Room[]> = ref([])
const router = useRouter()

const getRooms = (): void => {
  roomsApi
    .getRooms()
    .then((response) => (rooms.value = response))
    .catch((error) => console.log(error))
}

const clickDetails = (number: any): void => {
  router.push('/bookRoom/' + number)
}

const createRoom = (): void => {
  hasRoleOf(Role.ADMIN) ? router.push('/rooms') : router.push('/')
}

const deleteRoom = (roomid: any): void => {
  roomsApi.removeRoom({ id: roomid })
    .then((response) => (console.log(response), getRooms()))
    .catch((error) => console.log(error))
}

const editRoom = (number: any): void => {
  router.push('/rooms/' + number)
}

getRooms()

</script>

<template>
  <div>
    <h1 class="m-3">All rooms</h1>
    <ul class="m-0 p-0">
      <div class="" v-for="room in rooms" :key="room.roomNumber">
        <div class="card m-5  bg-light">
          <div class="card-body">
            <h5 class="card-title">{{ room.description }}</h5>
            <p class="card-text">Price per night: {{ room.price }} <br /> Max number of guests: {{ room.guestsMaxNumber }}
            </p>

            <button type="button" v-if="hasRoleOf(Role.CLIENT)" @click="clickDetails(room.roomNumber)"
              class="btn btn-primary"> Details</button>
            <button type="button" v-if="hasRoleOf(Role.ADMIN)" @click="editRoom(room.roomNumber)" class="btn btn-primary">
              Edit Room</button>
            <button type="button" v-if="hasRoleOf(Role.ADMIN)" @click="deleteRoom(room.roomNumber)"
              class="btn btn-primary m-2"> Delete Room</button>
          </div>
        </div>
      </div>
    </ul>
  </div>
  <div class="m-5">
    <button type="button" v-if="hasRoleOf(Role.ADMIN)" @click="createRoom()" class="btn btn-primary"> Create
      room</button>
  </div>
</template>
