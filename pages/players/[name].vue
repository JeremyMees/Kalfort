<script setup>
import Close from '~/assets/icons/close.svg'

const route = useRoute()
const { pending, data: player } = useLazyFetch(`/api/players/get?name=${route.params.name}`)
</script>

<template>
  <div v-if="pending" class="title-normal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading ...</div>
  <div v-else-if="!pending && player" class="flex flex-col gap-4 p-4 shadow-gray bg-slate-800 rounded relative">
    <NuxtLink to="/players" class="absolute right-2">
      <Close class="w-6 h-6 duration-200 ease-in-out hover:scale-125 text-red-400 cursor-pointer" />
    </NuxtLink>
    <div class="flex gap-4 items-center">
      <div class="h-[8rem] w-[8rem] min-h-[8rem] min-w-[8rem] rounded-xl overflow-hidden">
        <img :src="player.image" :alt="player.name" class="w-full h-full object-cover" />
      </div>
      <div class="flex flex-col gap-2">
        <p class="title-normal">{{ player.character_name }}</p>
        <p class="body-small">By {{ player.name }}</p>
      </div>
    </div>
    <div
      class="body-small flex flex-wrap gap-y-4 gap-x-2 justify-between md:justify-evenly border border-slate-700 rounded p-2 shadow-gray"
    >
      <div class="flex flex-col">
        <div class="font-bold">Level</div>
        <div>{{ player.level }}</div>
      </div>
      <div class="flex flex-col">
        <div class="font-bold">Class</div>
        <div>{{ player.class }}</div>
      </div>
      <div class="flex flex-col">
        <div class="font-bold">Race</div>
        <div>{{ player.race }}</div>
      </div>
      <div class="flex flex-col">
        <div class="font-bold">Alignment</div>
        <div>{{ player.alignment }}</div>
      </div>
    </div>
    <div class="flex flex-wrap justify-evenly">
      <div><span class="font-bold">Sessions played:</span> {{ player.sessions_played }}</div>
      <div>
        <span class="font-bold">Died:</span>
        {{ player.isAlive ? 'Not yet' : `At session ${player.sessions_played}` }}
      </div>
    </div>
    <div v-if="player.backstory" class="flex flex-col gap-2 border border-slate-700 rounded p-2 shadow-gray">
      <p class="title-subtle">Backstory</p>
      <div class="body-small">
        {{ player.backstory }}
      </div>
    </div>
    <div v-if="player.appearence" class="flex flex-col gap-2 border border-slate-700 rounded p-2 shadow-gray">
      <p class="title-subtle">Appearence</p>
      <div class="body-small">
        {{ player.appearence }}
      </div>
    </div>
  </div>
  <div v-else class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
    <span class="title-normal">The character that you are trying to search doesn't exist</span>
    <NuxtLink to="/players">
      <Button color="primary"> Back to player list </Button>
    </NuxtLink>
  </div>
</template>
