<script setup>
const { pending, data: characters } = useLazyFetch('/api/v1/characters/get_all')
</script>

<template>
  <div v-if="pending" class="title-normal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading ...</div>
  <div v-else class="flex flex-col gap-8 max-h-full py-4">
    <p class="title-normal">{{ characters.length }} Kalfort {{ characters.length > 1 ? 'escapers' : 'escaper' }}</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 p-1 gap-4 no-scrollbar overflow-y-auto overscroll-y-auto">
      <CharacterCard :character="character" v-for="character in characters" :key="character.uuid" />
    </div>
  </div>
</template>
