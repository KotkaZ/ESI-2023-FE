<script setup lang="ts">
import type { Room } from '#/rooms'
import { useServices } from '@/composables/useServices'
import { ref, type Ref } from 'vue'
const { roomsApi } = useServices()

const rooms: Ref<Room[]> = ref([])

roomsApi
  .getRooms()
  .then((response) => (rooms.value = response))
  .catch((error) => console.log(error))
</script>

<template>
  {{ rooms }}
</template>
