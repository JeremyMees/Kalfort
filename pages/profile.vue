<script setup>
import Close from '~/assets/icons/close.svg'
import Check from '~/assets/icons/check.svg'
import { v4 as uuidv4 } from 'uuid'
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, maxLength } from '@vuelidate/validators'

definePageMeta({ middleware: 'auth' })

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const edit = ref(false)
const error = ref(null)
const image = ref(null)
const imageFile = ref(null)
const profile = reactive({
  name: '',
  email: '',
  password: '',
  player: user.value.user_metadata.player,
  dm: user.value.user_metadata.dm,
})
const oneMustBeTrue = () => profile.player === true || profile.dm === true
const rules = {
  name: { minLengthValue: minLength(6), maxLengthValue: maxLength(50) },
  email: { email, maxLengthValue: maxLength(50) },
  password: { minLengthValue: minLength(6), maxLengthValue: maxLength(50) },
  player: { oneMustBeTrue },
  dm: { oneMustBeTrue },
}
const vProfile$ = useVuelidate(rules, profile)

function randomAvatar() {
  image.value = `https://avatars.dicebear.com/api/big-smile/${(Math.random() + 1).toString(36).substring(7)}.svg`
  imageFile.value = null
}

function stopEdditing() {
  image.value = null
  edit.value = false
}

async function updateAccount() {
  let updatedUser = {}
  let data = {}
  error.value = null
  await vProfile$.value.$validate()
  if (!oneMustBeTrue()) error.value = 'You must be a player or a dungeon master, you could also be both'
  if (vProfile$.value.$invalid) return
  const { name, email, password } = profile
  if (email) updatedUser = { ...updatedUser, email }
  if (password) updatedUser = { ...updatedUser, password }
  if (imageFile.value) {
    const fileName = uuidv4()
    const upload = await supabase.storage.from('avatars').upload(fileName, imageFile.value)
    const { publicURL } = supabase.storage.from('avatars').getPublicUrl(fileName)
    data = { ...data, image: publicURL }
  } else if (image.value) data = { ...data, image: image.value }
  if (profile.name) data = { ...data, name: name }
  data = { ...data, dm: profile.dm, player: profile.player }
  updatedUser = { ...updatedUser, data }
  const { user, error: updateError } = await supabase.auth.update(updatedUser)
  if (updateError) error.value = 'Something went wrong when updating profile page'
  else {
    const { data: nestedData, ...info } = updatedUser
    await supabase
      .from('players')
      .update({ ...info, ...nestedData })
      .eq('user_id', user.id)
    profile.name = null
    profile.email = null
    profile.password = null
    edit.value = false
  }
}
</script>

<template>
  <div
    v-if="user"
    class="max-w-md md:!max-w-xl mx-auto w-full sm:p-4 rounded sm:shadow-gray-xl sm:bg-slate-800 sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
  >
    <div class="flex flex-col gap-4 py-8 items-center">
      <div
        class="h-[100px] w-[100px] rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden shadow-gray-xl"
      >
        <img :src="image || user.user_metadata.image" alt="avatar" class="h-full w-full object-cover" />
      </div>
      <div v-if="edit" class="flex flex-row gap-4">
        <Button transparent @click="randomAvatar"> Randomize avatar </Button>
        <UploadImage transparent color="secondary" @image="v => (image = v)" @file="v => (imageFile = v)">
          Upload own image
        </UploadImage>
        <Button v-if="image" transparent @click="image = null"> Keep old image </Button>
      </div>
      <form v-if="edit" @submit.prevent="updateAccount()" class="flex flex-col gap-4 w-full">
        <div class="text-xs">You only need to fill the inputs of which values you want to change</div>
        <Input v-model="profile.name" type="text" label="First & last name" :errors="vProfile$.name.$errors" />
        <Input v-model="profile.email" type="email" label="Email address" :errors="vProfile$.email.$errors" />
        <Input v-model="profile.password" type="password" label="Password" :errors="vProfile$.password.$errors" />
        <div class="flex gap-8">
          <ToggleSlider label="Player" v-model="profile.player" />
          <ToggleSlider label="Dm" v-model="profile.dm" />
        </div>
        <p v-if="error" class="text-red-400 text-xs pt-1">{{ error }}</p>
        <div class="flex flex-row gap-4">
          <Button type="submit"> Update </Button>
          <Button transparent color="secondary" @click="stopEdditing"> Back </Button>
        </div>
      </form>
      <div v-else class="flex flex-col gap-4 w-full">
        <div class="flex flex-col sm:flex-row gap-2 md:gap-4">
          <p class="font-bold">First & last name:</p>
          <p>{{ user.user_metadata.name }}</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 md:gap-4">
          <p class="font-bold">Email:</p>
          <p>{{ user.email }}</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 md:gap-4 sm:items-center">
          <p class="font-bold">Player:</p>
          <Check v-if="user.user_metadata.player" class="h-4 w-4 text-green-300" />
          <Close v-else class="h-4 w-4 text-red-400" />
        </div>
        <div class="flex flex-col sm:flex-row gap-2 md:gap-4 sm:items-center">
          <p class="font-bold">Dungeon Master:</p>
          <Check v-if="user.user_metadata.dm" class="h-4 w-4 text-green-300" />
          <Close v-else class="h-4 w-4 text-red-400" />
        </div>
        <Button @click="edit = true"> Edit profile </Button>
      </div>
    </div>
  </div>
</template>
