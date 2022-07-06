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
  <div class="w-min mx-auto group relative my-6">
    <NuxtLink :to="path">
      <component
        :is="getIcon(icon)"
        class="group-hover:scale-125 focus-visible:scale-125 ease-in-out duration-200 w-5 h-5"
      />
    </NuxtLink>
    <p
      class="group-hover:block hidden absolute z-[100] w-max left-10 top-0 bg-slate-800/50 px-2 rounded-full shadow-gray"
    >
      {{ name }}
    </p>
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
