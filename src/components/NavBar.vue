<script setup lang="ts">
import { useRoute } from 'vue-router'
import LogoutButton from './LogoutButton.vue'
import { useAuth, Role } from '@/composables/useAuth'

const route = useRoute()
const { hasRoleOf } = useAuth()
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand m-2" href="#">Hotel System</a>

    <div class="container">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link" :class="{ active: route.path === '/' }"
            >Book</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink to="/about" class="nav-link" :class="{ active: route.path === '/about' }"
            >About</RouterLink
          >
        </li>
        <li class="nav-item" v-if="hasRoleOf(Role.ADMIN)">
          <RouterLink to="/support" class="nav-link" :class="{ active: route.path === '/support' }"
            >Support</RouterLink
          >
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <LogoutButton />
      </form>
    </div>
  </nav>
</template>
