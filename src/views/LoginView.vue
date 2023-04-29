<script setup lang="ts">
  import { useServices } from '@/composables/useServices'
  import type { User } from '#/auth'
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const { authApi } = useServices();

  const username = ref("");
  const password = ref("");

  const login = () => {
    const user: User = {
      name: username.value,
      password: password.value
    };
    authApi.loginAndGetToken({user})
    .then((response) => {
      const token: string = response;
      if (token.startsWith("ey"))
      {
        localStorage.setItem('jwtToken',  token);
        router.push('/')
      }
    })
  }
</script>

<template>
    <div class="form">
        <h3>LogIn</h3>
        <label for="username">User Name</label>
        <input type="text" name="username"  required v-model="username">
        <label for="password">Password</label>
        <input type="password" name="password" required v-model="password">
      <div class="container">
        <button @click="login"  class="center">LogIn</button>
        <button @click="router.push('/signup')" class="center">Signup</button>
      </div>
    </div>
</template>


<style scoped>
.form {
  max-width: 420px;
  margin: 30px auto;
  background: rgb(167, 154, 154);
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}
label {
  color: rgb(8, 110, 110);
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: blue;
}
button {
  background: rgb(8, 110, 110);
  border: 0;
  padding: 10px 20px;
  margin: 20px 20px 20px 20px;
  color: white;
  border-radius: 20px;
  align-items: center;
  text-align: center;
}
.center {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  width: 30%; 
}
.container {
  display: flex;
  justify-content: center;
}
</style>