<script setup>
const { pending, data: characters } = useLazyFetch('/api/v1/characters/get')
</script>

<template>
  <div v-if="pending" class="title-normal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading ...</div>
  <div v-else class="flex flex-col gap-8 max-h-full py-4">
    <p class="title-normal">{{ characters.length }} {{ characters.length > 1 ? 'Menaces' : 'Menace' }} to society</p>
    <div class="grow flex flex-row flex-wrap justify-center gap-4 no-scrollbar overflow-y-auto overscroll-y-auto">
      <PlayerCard :character="character" v-for="character in characters" :key="character.uuid" />
    </div>
  </div>
</template>
