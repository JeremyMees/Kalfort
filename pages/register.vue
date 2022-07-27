<script setup>
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, maxLength } from '@vuelidate/validators'
import Close from '~/assets/icons/close.svg'

const router = useRouter()
const error = ref(null)
const image = ref(null)
const imageFile = ref(null)
const profile = reactive({ displayName: 'jeremy mees', email: 'jeremymees123@gmail.com', password: 'Lies-1692' })
// const character = reactive({
//   name: null,
//   race: null,
//   class: null,
//   alignment: null,
//   sessions_played: 0,
//   backstory: null,
//   application: null,
// })
const profileRules = {
  displayName: { required, minLengthValue: minLength(6), maxLengthValue: maxLength(50) },
  email: { required, email, maxLengthValue: maxLength(50) },
  password: {
    required,
    minLengthValue: minLength(6),
    maxLengthValue: maxLength(50),
  },
}
// const characterRules = {
//   name: { required, minLengthValue: minLength(3), maxLengthValue: maxLength(50) },
//   race: { required, minLengthValue: minLength(3), maxLengthValue: maxLength(50) },
//   class: { required, minLengthValue: minLength(3), maxLengthValue: maxLength(50) },
//   alignment: { maxLengthValue: maxLength(50), minLengthValue: minLength(3) },
//   sessions_played: { required, integer, minValueValue: minValue(1) },
// }
const vProfile$ = useVuelidate(profileRules, profile)
// const vCharacter$ = useVuelidate(characterRules, character)

onMounted(() => randomAvatar())

async function createAccount() {
  error.value = null
  await vProfile$.value.$validate()
  if (vProfile$.value.$invalid) return
  let newUser = { ...profile, photoURL: image.value }
  if (imageFile.value) newUser.photoURL = await uploadFile(`images/players/`, imageFile.value)
  const user = await $fetch('/api/v1/auth/create', { method: 'POST', body: newUser })
  if (user.error) error.value = user.message
  else router.push({ path: '/login' })
}

function randomAvatar() {
  image.value = `https://avatars.dicebear.com/api/big-smile/${(Math.random() + 1).toString(36).substring(7)}.svg`
  imageFile.value = null
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
      <p class="title-normal">Create a account</p>
      <div class="flex flex-col gap-4 py-8 items-center">
        <div
          class="h-[100px] w-[100px] rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden shadow-gray-xl"
        >
          <img v-if="image" :src="image" alt="identicon" class="h-full w-full object-cover" />
        </div>
        <div class="flex flex-row gap-4">
          <Button transparent @click="randomAvatar"> Randomize avatar </Button>
          <UploadImage transparent color="secondary" @image="v => (image = v)" @file="v => (imageFile = v)">
            Upload own image
          </UploadImage>
        </div>
      </div>
      <form @submit.prevent="createAccount()" class="flex flex-col gap-4">
        <Input
          v-model="profile.displayName"
          type="text"
          label="First & last name"
          :errors="vProfile$.displayName.$errors"
          required
        />
        <Input v-model="profile.email" type="email" label="Email address" :errors="vProfile$.email.$errors" required />
        <Input
          v-model="profile.password"
          type="password"
          label="Password"
          :errors="vProfile$.password.$errors"
          required
        />
        <p v-if="error" class="text-red-400 text-xs pt-1">{{ error }}</p>
        <div class="flex flex-row gap-4">
          <Button type="submit"> Create </Button>
          <NuxtLink to="login" tabindex="-1">
            <Button transparent color="secondary"> Already a account </Button>
          </NuxtLink>
        </div>
      </form>
    </div>
    <!-- <div v-if="page === 1" class="flex flex-col gap-4">
      <p class="title-normal">Create your character</p>
      <Input v-model="character.name" type="text" label="Name" :errors="vCharacter$.name.$errors" required />
      <Input v-model="character.race" type="text" label="Race" :errors="vCharacter$.race.$errors" required />
      <Input v-model="character.class" type="text" label="Class" :errors="vCharacter$.class.$errors" required />
      <Input
        v-model="character.alignment"
        type="text"
        label="Alignment"
        class="w-full"
        :errors="vCharacter$.alignment.$errors"
      />
      <Input
        v-model="character.sessions_played"
        :min="0"
        type="number"
        label="Sessions played"
        :errors="vCharacter$.sessions_played.$errors"
        required
      />
      <TextArea
        v-model="character.backstory"
        type="text"
        label="Backstory"
        placeholder="I'm the best friend of kees and i would like to hold his hand"
        class="w-full"
      />
      <TextArea v-model="character.appearence" type="text" label="Appearence" class="w-full" />
      <Button> Create </Button> 
    </div>-->
  </div>
</template>
