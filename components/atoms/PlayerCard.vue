<script setup>
import Skull from '~/assets/icons/skull.svg'
defineProps({ player: { type: Object, required: true } })
</script>

<template>
  <div
    tabindex="0"
    class="shadow-gray outline-none items-center focus-visible:ring ring-red-400 px-4 py-3 rounded cursor-pointer ease-in-out duration-200 relative hover:-translate-y-1 group flex flex-row gap-x-4 bg-slate-800 w-full max-w-md"
  >
    <div class="h-20 w-20 min-h-[5rem] min-w-[5rem] rounded-xl overflow-hidden">
      <img :src="player.image" :alt="player.name" class="w-full h-full object-cover" />
    </div>
    <div class="flex flex-col">
      <p class="title-subtle">
        {{ player.character_name }} -
        <span class="body-small">{{ player.name }}</span>
      </p>
      <p class="body-small">{{ player.race }}</p>
      <p class="body-small">{{ player.class }}</p>
      <p class="body-small">Level {{ player.level }}</p>
    </div>
    <Skull v-if="!player.isAlive" class="h-6 w-6 absolute top-1 right-1" />
  </div>
</template>
