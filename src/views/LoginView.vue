<script setup lang="ts">
import { useServices } from '@/composables/useServices'
import type { User } from '#/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { authApi } = useServices()
const { setToken } = useAuth()

const username = ref('')
const password = ref('')

const login = () => {
  const user: User = {
    name: username.value,
    password: password.value
  }

  authApi
    .loginAndGetToken({ user })
    .then((token) => {
      setToken(token)
      router.push('/')
    })
    .catch((err) => console.log(err.message))
}
</script>

<template>
  <div class="row">
    <div class="mx-auto col-8 col-md-5 col-lg-3">
      <h3>Sign In</h3>
      <div class="form-group">
        <label for="username">User Name</label>
        <input type="text" name="username" class="form-control" required v-model="username" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name="password" class="form-control" required v-model="password" />
      </div>

      <div class="d-flex justify-content-between mt-3">
        <button type="button" @click="login" class="btn btn-primary">LogIn</button>
        <button type="button" @click="router.push('/signup')" class="btn btn-secondary">
          Signup
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
