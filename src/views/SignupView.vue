<script setup lang="ts">
import type { User } from '#/auth'
import { Role, useAuth } from '@/composables/useAuth'
import { useServices } from '@/composables/useServices'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { authApi } = useServices()
const { setToken } = useAuth()
const router = useRouter()

const username = ref('')
const password = ref('')
const role = ref(Role.CLIENT)

const signup = () => {
  const user: User = {
    name: username.value,
    password: password.value,
    role: role.value
  }

  authApi
    .signupUser({ user })
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
      <h3>SignUp</h3>
      <div class="form-group">
        <label for="username">User Name</label>
        <input type="text" name="username" class="form-control" required v-model="username" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name="password" class="form-control" required v-model="password" />
      </div>

      <div class="form-group">
        <label for="roles">Role</label>
        <select class="form-control" name="roles" required v-model="role">
          <option v-for="role in Role" :key="role">{{ role }}</option>
        </select>
      </div>

      <div class="mt-3">
        <button type="button" @click="signup" class="btn btn-primary">SignUp</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
