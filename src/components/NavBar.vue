<script setup lang="ts">
import { useRoute } from 'vue-router';
import LogoutButton from './LogoutButton.vue'

const route = useRoute()
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Hotel System</a>

    <div class="container">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link" :class="{ active: route.path === '/'}">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/about" class="nav-link" :class="{ active: route.path === '/about'}">About</RouterLink>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <LogoutButton />
      </form>
    </div>
  </nav>
</template>
