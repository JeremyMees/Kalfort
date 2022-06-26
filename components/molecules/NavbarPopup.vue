<script setup>
import { useIndexStore } from '~/stores/index'
import Close from '~/assets/icons/close.svg'

defineEmits(['close'])
const index = useIndexStore()
</script>

<template>
  <div class="flex flex-col justify-between pb-16">
    <div class="flex flex-col gap-2">
      <div class="flex flex-row justify-end gap-2 group cursor-pointer text-red-400" @click="$emit('close')">
        <div>Close</div>
        <Close class="w-6 h-6 group-hover:scale-125" />
      </div>
      <div class="flex flex-col gap-4">
        <RoutingCard
          v-for="route in index.routes"
          :key="route.name"
          :name="route.name"
          :path="route.path"
          :icon="route.icon"
        />
      </div>
    </div>
  </div>
</template>
