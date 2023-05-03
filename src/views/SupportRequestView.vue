<script setup lang="ts">
import type { Room } from '#/rooms'
import type { Support } from '#/support'
import { useServices } from '@/composables/useServices'
import { ref, type Ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter, useRoute } from 'vue-router'
const { supportApi } = useServices()
const route = useRoute();
const router = useRouter()
const { userId } = useAuth()

const request: Ref<Support | null> = ref(null)


supportApi
  .getRequestById({ id: Number(route.params.id) })
  .then((response) => (request.value = response))
  .catch((error) => console.log(error))

const startCleaning = (): void => {
  supportApi.startCleaningRequest({ id: Number(route.params.id), assignedTo: userId })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
  router.go(0)
}

const endCleaning = (): void => {
  supportApi.endCleaningRequest({ id: Number(route.params.id) })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
  router.go(0)
}

</script>

<template>
  <div class="row">
    <div class="mx-auto col-8 col-md-5 col-lg-6">
      <h3 :hidden="route.params.id !== undefined">Create new room</h3>
      <h3 :hidden="route.params.id == undefined">Edit room</h3>
      <div class="card bg-light">
        <div class="card-body">
          <h5 class="card-title">Request ID: {{ request == null ? "Loading..." : request.requestId }}</h5>
          <p class="card-text">
            Assigned to: {{ request == null ? "Loading..." : request.assignedTo }} <br />
            Booking ID: {{ request == null ? "Loading..." : request.bookingId }}<br />
            Requested at: {{ request == null ? "Loading..." : request.requestedAt }} <br />
            Cleaning started at: {{ request == null ? "Loading..." : request.cleaningStartedAt }} <br />
            Cleaning finished at: {{ request == null ? "Loading..." : request.cleanedAt }} <br /> </p>

          <button type="button" :disabled="request?.cleaningStartedAt !== undefined" @click="startCleaning()"
            class="btn btn-primary m-2"> Start Cleaning</button>
          <button type="button" :disabled="request?.cleanedAt !== undefined || request?.cleaningStartedAt == undefined"
            @click="endCleaning()" class="btn btn-primary m-2"> End Cleaning</button>
        </div>
      </div>


    </div>
  </div>
</template>
