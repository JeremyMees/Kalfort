<script setup>
import Close from '~/assets/icons/close.svg'

const route = useRoute()
const { pending, data: character } = useFetch('/api/v1/characters/get_with_name', {
  method: 'POST',
  body: { name: route.params.name },
})
</script>

<template>
  <div v-if="pending" class="title-normal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading ...</div>
  <div v-else-if="!pending && character" class="flex flex-col gap-4 p-4 shadow-gray bg-slate-800 rounded relative">
    <NuxtLink to="/characters" class="absolute right-2">
      <Close class="w-6 h-6 duration-200 ease-in-out hover:scale-125 text-red-400 cursor-pointer" />
    </NuxtLink>
    <div class="flex gap-4 items-center">
      <ImagesSwiper :images="character.images" />
      <div class="flex flex-col gap-2 grow">
        <p class="title-normal">{{ character.character_name }}</p>
        <p class="body-small">By {{ character.player_name }}</p>
      </div>
    </div>
    <div
      class="body-small flex flex-wrap gap-y-4 gap-x-2 justify-between md:justify-evenly border border-slate-700 rounded p-2 shadow-gray"
    >
      <div class="flex flex-col">
        <div class="font-bold">Level</div>
        <div>{{ character.level }}</div>
      </div>
      <div class="flex flex-col">
        <div class="font-bold">Class</div>
        <div>{{ character.class }}</div>
      </div>
      <div class="flex flex-col">
        <div class="font-bold">Race</div>
        <div>{{ character.race }}</div>
      </div>
      <div class="flex flex-col">
        <div class="font-bold">Alignment</div>
        <div>{{ character.alignment }}</div>
      </div>
    </div>
    <div class="flex flex-wrap justify-evenly">
      <div><span class="font-bold">Sessions played:</span> {{ character.sessions_played }}</div>
      <div>
        <span class="font-bold">Died:</span>
        {{ character.isAlive ? 'Not yet' : `At session ${character.sessions_played}` }}
      </div>
    </div>
    <div v-if="character.backstory" class="flex flex-col gap-2 border border-slate-700 rounded p-2 shadow-gray">
      <p class="title-subtle">Backstory</p>
      <div class="body-small">
        {{ character.backstory }}
      </div>
    </div>
    <div v-if="character.appearance" class="flex flex-col gap-2 border border-slate-700 rounded p-2 shadow-gray">
      <p class="title-subtle">Appearance</p>
      <div class="body-small">
        {{ character.appearance }}
      </div>
    </div>
  </div>
  <div v-else class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
    <span class="title-normal">The character that you are trying to search doesn't exist</span>
    <NuxtLink to="/characters">
      <Button color="primary"> Back to characters list </Button>
    </NuxtLink>
  </div>
</template>
