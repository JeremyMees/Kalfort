<script setup>
defineProps({
  path: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
})

function getIcon(icon) {
  return defineAsyncComponent(() => icons[icon])
}
</script>

<template>
  <NuxtLink
    tabindex="0"
    :to="path"
    class="shadow-gray px-4 py-3 rounded cursor-pointer w-fit ease-in-out duration-200 relative hover:-translate-y-1 group flex flex-row gap-x-2 items-center bg-slate-800"
  >
    <component
      v-if="icon"
      :is="getIcon(icon)"
      class="group-hover:scale-125 focus-visible:scale-125 ease-in-out duration-200 w-5 h-5"
    />
    <div class="call-to-action">
      {{ name }}
    </div>
  </NuxtLink>
</template>

<script>
const icons = {
  achievement: import('../../assets/icons/achievement.svg'),
  calendar: import('../../assets/icons/calendar.svg'),
  close: import('../../assets/icons/close.svg'),
  dms: import('../../assets/icons/dms.svg'),
  home: import('../../assets/icons/home.svg'),
  leaderboards: import('../../assets/icons/leaderboards.svg'),
  level: import('../../assets/icons/level.svg'),
  players: import('../../assets/icons/players.svg'),
  profile: import('../../assets/icons/profile.svg'),
}
</script>
