<script setup>
import Close from '~/assets/icons/close.svg'
</script>

<template>
  <div class="inset-0 fixed z-20 p-4 bg-slate-900 overflow-auto no-scrollbar">
    <div
      class="max-w-md md:!max-w-xl mx-auto w-full sm:p-4 rounded sm:shadow-gray-xl sm:bg-slate-800 sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
    >
      <NuxtLink to="/" class="absolute right-5 top-5 focus:outline-none">
        <Close class="w-6 h-6 hover:scale-125 text-red-400 duration-200 ease-in-out cursor-pointer" />
      </NuxtLink>
      <p class="title-normal pb-10">Logout</p>
      <img src="@/assets/images/d20.png" alt="d20" class="mx-auto h-[250px] aspect-square animate-pulse" />
      <div class="flex flex-row gap-4 pt-10">
        <Button type="submit" color="primary"> Logout </Button>
        <NuxtLink to="/" class="focus:outline-none">
          <Button transparent color="secondary" @click="forgotPassword = false"> Back </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
