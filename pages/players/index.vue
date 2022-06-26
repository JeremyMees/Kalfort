<script setup>
const { pending, data: players } = useLazyFetch('/api/players/get')
</script>

<template>
  <div v-if="pending" class="title-normal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading ...</div>
  <div v-else class="flex flex-col gap-8 max-h-full py-4">
    <p class="title-normal">{{ players.length }} Brave {{ players.length > 1 ? 'explorers' : 'explorer' }}</p>
    <div class="grow flex flex-row flex-wrap justify-center gap-4 no-scrollbar overflow-y-auto overscroll-y-auto">
      <PlayerCard :player="player" v-for="player in players" :key="player.uuid" />
    </div>
  </div>
</template>
