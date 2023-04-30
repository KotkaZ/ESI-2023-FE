<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const { logout } = useAuth()
const router = useRouter()

const logoutCallback = (): void => {
  logout()
  router.push('/login')
}
</script>

<template>
  <div>
    <button type="button" @click="logoutCallback" class="btn btn-secondary">Logout</button>
  </div>
</template>
