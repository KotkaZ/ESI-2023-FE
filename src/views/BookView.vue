<script setup lang="ts">
import type { Room } from '#/rooms'
import { useServices } from '@/composables/useServices'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
const { roomsApi } = useServices()

const rooms: Ref<Room[]> = ref([])
const router = useRouter()

roomsApi
  .getRooms()
  .then((response) => (rooms.value = response))
  .catch((error) => console.log(error))

const clickDetails = (number: any): void => {
  router.push('/rooms/' + number)
}
</script>

<template>
  <div class="">
    <div>
    <h1 class="m-3">All rooms</h1>
    <ul class="m-0 p-0">
      <div class="" v-for="room in rooms" :key="room.roomNumber">
        <div class="card m-5  bg-light">
          <div class="card-body">
            <h5 class="card-title">{{ room.description }}</h5>
            <p class="card-text">Price per night: {{ room.price }} <br/> Max number of guests: {{ room.guestsMaxNumber }}</p>
            <p class="card-text"></p>
            <button type="button" @click="clickDetails(room.roomNumber)" class="btn btn-primary"> Details</button>
          </div>
        </div>
      </div>
    </ul>
    </div>
  </div>
  

</template>
