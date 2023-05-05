<script setup lang="ts">
import type { Room } from '#/rooms'
import type { Support } from '#/support'
import { useServices } from '@/composables/useServices'
import { ref, type Ref } from 'vue'
import { useAuth, Role } from '@/composables/useAuth'
import { useRouter, useRoute } from 'vue-router'
const { supportApi } = useServices()
const route = useRoute();
const router = useRouter()
const { userId, hasRoleOf } = useAuth()

const request: Ref<Support> = ref({})

const getRequests = (): void => {
  supportApi
    .getRequestById({ id: Number(route.params.id) })
    .then((response) => (request.value = response))
    .catch((error) => console.log(error))
}

const startCleaning = (): void => {
  supportApi.startCleaningRequest({ id: Number(route.params.id), assignedTo: userId })
    .then((response) => (console.log(response), getRequests()))
    .catch((error) => console.log(error))
}

const endCleaning = (): void => {
  supportApi.endCleaningRequest({ id: Number(route.params.id) })
    .then((response) => (console.log(response), getRequests()))
    .catch((error) => console.log(error))
}

getRequests()

</script>

<template>
  <div class="row">
    <div class="mx-auto col-8 col-md-5 col-lg-6">
      <h3 v-if="route.params.id == undefined">Create new room</h3>
      <h3 v-if="route.params.id !== undefined">Edit room</h3>
      <div class="card bg-light">
        <div class="card-body">
          <h5 class="card-title">Request ID: {{ request.requestId || "Loading..." }}</h5>
          <p class="card-text">
            Assigned to: {{ request.assignedTo || "Loading..." }} <br />
            Booking ID: {{ request.bookingId || "Loading..." }}<br />
            Requested at: {{ request.requestedAt || "Loading..." }} <br />
            Cleaning started at: {{ request.cleaningStartedAt || "Loading..." }} <br />
            Cleaning finished at: {{ request.cleanedAt || "Loading..." }} <br /> </p>

          <button type="button" v-if= "hasRoleOf(Role.SUPPORT)" :disabled="request?.cleaningStartedAt !== undefined" @click="startCleaning()"
            class="btn btn-primary m-2"> Start Cleaning</button>
          <button type="button" v-if= "hasRoleOf(Role.SUPPORT)" :disabled="request?.cleanedAt !== undefined || request?.cleaningStartedAt == undefined"
            @click="endCleaning()" class="btn btn-primary m-2"> End Cleaning</button>
        </div>
      </div>


    </div>
  </div>
</template>
