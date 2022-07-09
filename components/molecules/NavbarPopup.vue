<script setup>
import { useIndexStore } from '~/stores/index'
import Close from '~/assets/icons/close.svg'
import Login from '~/assets/icons/login.svg'
import Logout from '~/assets/icons/logout.svg'
import Register from '~/assets/icons/register.svg'

defineEmits(['close'])
const index = useIndexStore()
</script>

<template>
  <div class="flex flex-col justify-between pb-16">
    <div class="flex flex-col gap-4 relative">
      <Close
        class="w-6 h-6 hover:scale-125 text-red-400 duration-200 ease-in-out cursor-pointer absolute right-1 top-1"
        @click="$emit('close')"
      />
      <NuxtLink
        to="/login"
        tabindex="0"
        class="shadow-gray px-4 py-3 rounded cursor-pointer w-fit ease-in-out duration-200 relative hover:-translate-y-1 group flex flex-row gap-x-2 items-center bg-slate-800"
      >
        <Login class="group-hover:scale-125 focus-visible:scale-125 ease-in-out duration-200 w-5 h-5" />
        <div class="call-to-action">Login</div>
      </NuxtLink>
      <NuxtLink
        to="/register"
        tabindex="0"
        class="shadow-gray px-4 py-3 rounded cursor-pointer w-fit ease-in-out duration-200 relative hover:-translate-y-1 group flex flex-row gap-x-2 items-center bg-slate-800"
      >
        <Register class="group-hover:scale-125 focus-visible:scale-125 ease-in-out duration-200 w-5 h-5" />
        <div class="call-to-action">Register</div>
      </NuxtLink>
      <RoutingCard
        v-for="route in index.routes"
        :key="route.name"
        :name="route.name"
        :path="route.path"
        :icon="route.icon"
      />
      <NuxtLink
        to="/logout"
        tabindex="0"
        class="shadow-gray px-4 py-3 rounded cursor-pointer w-fit ease-in-out duration-200 relative hover:-translate-y-1 group flex flex-row gap-x-2 items-center bg-slate-800"
      >
        <Logout class="group-hover:scale-125 focus-visible:scale-125 ease-in-out duration-200 w-5 h-5" />
        <div class="call-to-action">Logout</div>
      </NuxtLink>
    </div>
  </div>
</template>
