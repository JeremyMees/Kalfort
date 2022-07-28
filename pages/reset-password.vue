<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import Close from '~/assets/icons/close.svg'

const router = useRouter()
const supabase = useSupabaseClient()
const error = ref(null)
const profile = reactive({ password: '' })
const rules = { password: { required, minLengthValue: minLength(6), maxLengthValue: maxLength(50) } }
const vProfile$ = useVuelidate(rules, profile)

onMounted(() => useHead({ title: 'Kalfort' }))

async function resetPassword() {
  error.value = null
  await vProfile$.value.$validate()
  if (vProfile$.value.$invalid) return
  await supabase.auth.update({ password: profile.password })
  router.push({ path: '/' })
}
</script>

<template>
  <div class="inset-0 fixed z-20 p-4 bg-slate-900 overflow-auto no-scrollbar">
    <div
      class="flex flex-col gap-10 max-w-md md:!max-w-xl mx-auto w-full sm:p-4 rounded sm:shadow-gray-xl sm:bg-slate-800 sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
    >
      <NuxtLink to="/" class="absolute right-5 top-5 focus:outline-none">
        <Close class="w-6 h-6 hover:scale-125 text-red-400 duration-200 ease-in-out" />
      </NuxtLink>
      <p class="title-normal">Reset password</p>
      <form @submit.prevent="resetPassword()" class="flex flex-col gap-4">
        <Input
          v-model="profile.password"
          type="password"
          label="Password"
          :errors="vProfile$.password.$errors"
          required
        />
        <p v-if="error" class="text-red-400 text-xs pt-1">{{ error }}</p>
        <div class="flex flex-row gap-4">
          <Button type="submit"> Reset password </Button>
          <NuxtLink to="login" tabindex="-1">
            <Button transparent color="secondary"> Back </Button>
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
