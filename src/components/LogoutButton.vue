<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { logout } = useAuth()
</script>

<template>
  <div>
    <button @click="logout" class="center">Logout</button>
  </div>
</template>

