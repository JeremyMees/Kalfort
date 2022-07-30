<script setup>
import Close from '~/assets/icons/close.svg'

const route = useRoute()
const supabase = useSupabaseClient()
const router = useRouter()

const { data: player, pending } = await useAsyncData('player', async () => {
  const { data, error } = await supabase.from('players').select('*').eq('user_id', route.params.id)
  if (error) router.push({ path: '/' })
  else return data[0]
})
</script>

<template>
  <div v-if="pending" class="title-normal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading ...</div>
  <div v-else-if="!pending && player" class="flex flex-col gap-4 p-4 shadow-gray bg-slate-800 rounded relative">
    <NuxtLink to="/players" class="absolute right-2">
      <Close class="w-6 h-6 duration-200 ease-in-out hover:scale-125 text-red-400 cursor-pointer" />
    </NuxtLink>
    <div class="flex gap-4 items-center">
      <div class="h-[8rem] w-[8rem] min-h-[8rem] min-w-[8rem] rounded-xl overflow-hidden">
        <img :src="player.image" :alt="player.name" class="w-full h-full object-cover" />
      </div>
      <p class="title-normal">{{ player.name }}</p>
    </div>
    <!-- <div
      class="body-small flex flex-wrap gap-y-4 gap-x-2 justify-between md:justify-evenly border border-slate-700 rounded p-2 shadow-gray"
    >
      <div class="flex flex-col">
        <div class="font-bold">Sessions played</div>
        <div>
          {{ data.characters.reduce((a, b) => a + b.sessions_played, 0) }}
        </div>
      </div>
      <div class="flex flex-col">
        <div class="font-bold">Characters</div>
        <div>{{ data.characters.length }}</div>
      </div>
      <div class="flex flex-col">
        <div class="font-bold">Achievements</div>
        <div>0</div>
      </div>
    </div>
    <div
      v-for="character in data.characters"
      :key="character.uuid"
      class="grid grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 gap-10"
    >
      <SwiperCharacterCard :character="character" />
    </div> -->
  </div>
  <div v-else class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
    <p class="title-normal">The player that you are trying to search doesn't exist</p>
    <NuxtLink to="/players">
      <Button color="primary"> Back to players list </Button>
    </NuxtLink>
  </div>
</template>
