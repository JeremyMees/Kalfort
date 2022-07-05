<script setup>
import Skull from '~/assets/icons/skull.svg'
defineProps({ character: { type: Object, required: true } })
</script>

<template>
  <div class="rounded shadow-gray cursor-pointer ease-in-out duration-200 relative hover:-translate-y-1">
    <NuxtLink :to="'/characters/' + character.uuid" class="w-full">
      <img :src="character.images[0]" :alt="character.name" class="rounded w-full aspect-[9/12] object-cover" />
      <div class="flex items-center gap-4 justify-between absolute bottom-1 inset-x-1">
        <p class="title-subtle break-words bg-slate-800/30 py-1 px-2 rounded-full">
          {{ character.character_name }}
        </p>
        <Skull v-if="character.alive" class="h-8 w-8 bg-red-400 rounded-full p-2" />
      </div>
    </NuxtLink>
  </div>
</template>
