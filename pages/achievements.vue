<script setup>
const { pending, data: achievements } = useLazyFetch('/api/v1/achievements/get_all')
</script>

<template>
  <div v-if="pending" class="title-normal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading ...</div>
  <div v-else class="flex flex-col gap-8 max-h-screen p-4">
    <p class="title-normal">Achievements</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 p-1 gap-4 no-scrollbar overflow-y-auto overscroll-y-auto">
      <AchievementCard :achievement="achievement" v-for="achievement in achievements" :key="achievement.uuid" />
    </div>
  </div>
</template>
