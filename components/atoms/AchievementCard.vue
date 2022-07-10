<script setup>
defineProps({ achievement: { type: Object, required: true } })
</script>

<template>
  <div
    class="cursor-pointer shadow-gray w-full outline-none px-4 py-3 rounded ease-in-out duration-200 relative hover:-translate-y-1 flex flex-col gap-y-4 bg-slate-800"
  >
    <p class="title-normal">{{ achievement.name }}</p>
    <div class="flex flex-col">
      <p class="body-small font-bold">Description</p>
      <p class="body-small">{{ achievement.description }}</p>
    </div>
    <div class="flex flex-col">
      <p class="body-small font-bold">Award</p>
      <p class="body-small">{{ achievement.award }}</p>
    </div>
    <div class="flex flex-col">
      <p class="body-small font-bold">Achieved by</p>
      <p class="body-small">{{ achievement.achieved_by }} (add players in firebase)</p>
    </div>
  </div>
</template>
