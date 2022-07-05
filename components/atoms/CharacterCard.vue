<script setup>
import Skull from '~/assets/icons/skull.svg'
defineProps({ character: { type: Object, required: true } })
</script>

<template>
  <div class="w-full">
    <NuxtLink :to="'/characters/' + character.character_name">
      <div
        tabindex="0"
        class="shadow-gray outline-none items-center focus-visible:ring ring-red-400 px-4 py-3 rounded cursor-pointer ease-in-out duration-200 relative hover:-translate-y-1 group flex flex-row gap-x-4 bg-slate-800"
      >
        <ImagesSwiper :images="character.images" />
        <div class="flex flex-col grow">
          <p class="title-subtle">
            {{ character.character_name }} -
            <span class="body-small">{{ character.player_name }}</span>
          </p>
          <p class="body-small">{{ character.race }}</p>
          <p class="body-small">{{ character.class }}</p>
          <p class="body-small">Level {{ character.level }}</p>
        </div>
        <Skull v-if="!character.alive" class="h-6 w-6 absolute top-1 right-1" />
      </div>
    </NuxtLink>
  </div>
</template>
