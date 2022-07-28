<script setup>
import * as kolibri from '~/assets/animations/kolibri.json'
import Close from '~/assets/icons/close.svg'

const animation = ref(kolibri)
const router = useRouter()
const supabase = useSupabaseClient()
const config = useRuntimeConfig()
const forgotPassword = ref(false)
const route = useRoute()
const auth = reactive({ email: '', password: '' })
const resetEmail = ref()
const error = ref()

onMounted(() => {
  if (Object.keys(route.query).includes('forgot') && route.query['forgot'] === 'true') forgotPassword.value = true
})

async function login() {
  await supabase.auth.signIn(auth)
  router.push({ path: '/' })
}

async function sendResetPasswordEmail() {
  // redirecteTo and follow this https://supabase.com/docs/reference/javascript/auth-api-resetpasswordforemail
  await supabase.auth.api.resetPasswordForEmail(resetEmail.value, { redirectTo: `${config.baseUrl}/reset-password` })
}
</script>

<template>
  <div class="inset-0 fixed z-20 p-4 bg-slate-900 overflow-auto no-scrollbar">
    <div
      class="max-w-md md:!max-w-xl mx-auto w-full sm:p-4 rounded sm:shadow-gray-xl sm:bg-slate-800 sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
    >
      <NuxtLink to="/" class="absolute right-5 top-5 focus:outline-none">
        <Close class="w-6 h-6 hover:scale-125 text-red-400 duration-200 ease-in-out cursor-pointer" />
      </NuxtLink>
      <p class="title-normal">Login</p>
      <Vue3Lottie :animationData="animation" class="w-[300px] h-[300px] scale-110 mx-auto" />
      <form v-if="!forgotPassword" @submit.prevent="login()" class="flex flex-col gap-4">
        <Input v-model="auth.email" type="email" label="Email address" required />
        <Input v-model="auth.password" type="password" label="Password" required />
        <p v-if="error" class="text-red-400 text-xs pt-1">{{ error }}</p>
        <div class="flex flex-row gap-4">
          <Button type="submit"> Login </Button>
          <NuxtLink to="register" tabindex="-1">
            <Button transparent color="secondary"> New user </Button>
          </NuxtLink>
          <Button transparent @click="forgotPassword = true"> Forgot password </Button>
        </div>
      </form>
      <form v-else @submit.prevent="sendResetPasswordEmail()" class="flex flex-col gap-4">
        <Input v-model="resetEmail" type="email" label="Email address" required />
        <p v-if="error" class="text-red-400 text-xs pt-1">{{ error }}</p>
        <div class="flex flex-row gap-4">
          <Button type="submit" color="danger"> Send reset email </Button>
          <Button transparent @click="forgotPassword = false"> Back </Button>
        </div>
      </form>
    </div>
  </div>
</template>
