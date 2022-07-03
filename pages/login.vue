<script setup>
import * as kolibri from '~/assets/animations/kolibri.json'
// import { signInWithEmailAndPassword } from 'firebase/auth'

const { $firebaseAuth } = useNuxtApp()
const animation = ref(kolibri)
// const auth = reactive({ email: '', password: '' })
const error = ref(null)

// onMounted(() => console.log($auth))

function login() {}
</script>

<template>
  <div class="inset-0 fixed z-20 p-4 bg-slate-900 overflow-auto no-scrollbar">
    <div
      class="max-w-[500px] mx-auto w-full sm:p-4 rounded sm:shadow-gray-xl sm:bg-slate-800 sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
    >
      <p class="title-normal">Login</p>
      <Vue3Lottie :animationData="animation" class="w-[300px] h-[300px] scale-110 mx-auto" />
      <form @submit.prevent="login()" class="flex flex-col gap-4">
        <!-- <Input v-model="auth.email" type="email" label="Email address" required />
        <Input v-model="auth.password" type="password" label="Password" required /> -->
        <p v-if="error" class="text-red-400 text-xs pt-1">{{ error }}</p>
        <div class="flex flex-row gap-4 max-w-[300px]">
          <Button type="submit"> Login </Button>
          <Button transparent color="secondary"> New user </Button>
        </div>
      </form>
    </div>
  </div>
</template>
