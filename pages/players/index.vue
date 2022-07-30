<script setup>
const supabase = useSupabaseClient()
const router = useRouter()

const { data: players, pending } = await useAsyncData('players', async () => {
  const { data, error } = await supabase.from('players').select('*')
  if (error) router.push({ path: '/' })
  else return data
})
</script>

<template>
  <div v-if="pending" class="title-normal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading ...</div>
  <div v-else class="flex flex-col gap-8 max-h-full p-4">
    <p class="title-normal">{{ players.length }} Brave {{ players.length > 1 ? 'players' : 'player' }}</p>
    <div
      class="grid grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 p-1 gap-4 no-scrollbar overflow-y-auto overscroll-y-auto"
    >
      <PlayerCard v-for="player in players" :key="player.user_id" :player="player" />
    </div>
  </div>
</template>
