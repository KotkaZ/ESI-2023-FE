<script setup lang="ts">
import type { DirtyEntity } from '#/support'
import { useServices } from '@/composables/useServices'
import { ref, type Ref } from 'vue'
const { supportApi } = useServices()

const dirtyRooms: Ref<DirtyEntity[]> = ref([])

supportApi
  .getCleaningRequests()
  .then((response) => (dirtyRooms.value = response))
  .catch((error) => console.log(error))
</script>

<template>
  {{ dirtyRooms }}
</template>
