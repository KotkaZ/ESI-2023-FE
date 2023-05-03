<script setup lang="ts">
import type { DirtyEntity } from '#/support'
import { useServices } from '@/composables/useServices'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const { supportApi } = useServices()
const router = useRouter()

const dirtyRooms: Ref<DirtyEntity[]> = ref([])

supportApi
  .getCleaningRequests()
  .then((response) => (dirtyRooms.value = response))
  .catch((error) => console.log(error))

const clickDetails = (number: any): void => {
  router.push('/support/' + number)
}

</script>

<template>
  <div class="">
    <div>
      <h1 class="m-3">Cleaning requests</h1>
      <ul class="m-0 p-0">
        <div class="" v-for="rooms in dirtyRooms" :key="rooms.requestId">
          <div class="card m-5 bg-light">
            <div class="card-body">
              <h5 class="card-title"> Request ID: {{ rooms.requestId }}</h5>
              <p class="card-text">Booking number: {{ rooms.bookingId }} <br /> </p>
              <button type="button" @click="clickDetails(rooms.requestId)" class="btn btn-primary">Details</button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>
