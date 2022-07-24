<script setup>
defineProps({
  icon: { type: String, required: true },
  name: { type: String, required: true },
  path: { type: String, required: true },
})

function getIcon(icon) {
  return defineAsyncComponent(() => icons[icon])
}
</script>

<template>
  <div class="group my-6">
    <NuxtLink :to="path" class="flex gap-4 justify-center">
      <component
        :is="getIcon(icon)"
        class="group-hover:scale-125 focus-visible:scale-125 ease-in-out duration-200 w-5 h-5"
        v-tooltip.right="name"
      />
    </NuxtLink>
  </div>
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
  character: import('../../assets/icons/character.svg'),
  login: import('../../assets/icons/login.svg'),
  register: import('../../assets/icons/register.svg'),
  logout: import('../../assets/icons/logout.svg'),
}
</script>
