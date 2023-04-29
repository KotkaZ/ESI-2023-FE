<script setup lang="ts">
import { useServices } from '@/composables/useServices'
import TheWelcome from '@/components/TheWelcome.vue'

const { roomsApi } = useServices()

roomsApi
  .getRooms()
  .then((response) => console.log(response))
  .catch((error) => console.log(error))
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
