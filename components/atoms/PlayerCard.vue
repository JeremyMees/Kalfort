<script setup>
defineProps({ player: { type: Object, required: true } })
</script>

<template>
  <NuxtLink :to="'/players/' + player.user_id" class="w-full">
    <div
      tabindex="0"
      class="shadow-gray outline-none items-center focus-visible:ring ring-red-400 px-4 py-3 rounded cursor-pointer ease-in-out duration-200 relative hover:-translate-y-1 group flex flex-row gap-x-4 bg-slate-800 w-full"
    >
      <div class="h-20 w-20 min-h-[5rem] min-w-[5rem] rounded-xl overflow-hidden">
        <img :src="player.image" :alt="player.name" class="w-full h-full object-cover" />
      </div>
      <div class="flex flex-col">
        <p class="title-subtle">
          {{ player.name }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
