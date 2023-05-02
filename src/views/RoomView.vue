<script setup lang="ts">
import type { Room } from '#/rooms'
import { useServices } from '@/composables/useServices'
import { ref, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const { roomsApi, bookingApi } = useServices()
const route = useRoute();
const router = useRouter()

const room: Ref<Room | null> = ref(null)
const startDate = ref('')
const endDate = ref('')
const available: Ref<boolean> = ref(false)

roomsApi
  .getRoomById({ id: Number(route.params.id) })
  .then((response) => (room.value = response))
  .catch((error) => console.log(error))

const clickDetails = (): void => {
  // router.push('/api/aproduct/')
}

const checkAvailability = (): void => {
  // bookingApi
  //   .getRoomAvailability({ startDate: new Date(startDate.value), endDate: new Date(endDate.value), roomId: Number(route.params.id) })
  //   .then((response) => console.log(response))
  //   .catch((error) => console.log(error))
}

</script>

<template>
  <div class="">
    <div>
      <h1 class="m-3">Room details</h1>

      <div class="card m-5  bg-light">
        <div class="card-body">
          <h5 class="card-title">{{ room == null ? "Loading..." : room.description }}</h5>
          <p class="card-text">Price per night: {{ room == null ? "Loading..." : room.price }} <br /> Max number of
            guests: {{ room == null ? "Loading..." : room.guestsMaxNumber }}</p>

          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Start:</label>
              <input type="date" class="form-control" required v-model="startDate">

            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">End:</label>
              <input type="date" class="form-control" required v-model="endDate">
            </div>
            <button type="button" @click="checkAvailability()" class="btn btn-primary mt-2">Check availability</button>
          </form>

          <div>Is the room available: {{ available }}</div>
          <button type="button" @click="clickDetails()" class="btn btn-primary mt-2"> Book</button>
        </div>
      </div>



    </div>
  </div>
</template>
