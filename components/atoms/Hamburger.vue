<script setup>
defineEmits(['toggled'])
defineProps({ modelValue: { type: Boolean, required: true } })
</script>

<template>
  <div class="relative block w-5 h-5 duration-300 ease-in-out cursor-pointer" @click="$emit('toggled', !modelValue)">
    <span
      :class="{ '!top-[7px] rotate-[135deg]': modelValue }"
      class="top-0 block absolute opacity-100 left-0 w-full h-[2px] ease-in-out duration-200 bg-white"
    />
    <span
      :class="{ '!opacity-0 -left-10': modelValue }"
      class="top-[7px] block absolute opacity-100 left-0 w-full h-[2px] ease-in-out duration-200 bg-white"
    />
    <span
      :class="{ '!top-[7px] rotate-[-135deg]': modelValue }"
      class="top-[14px] block absolute opacity-100 left-0 w-full h-[2px] ease-in-out duration-200 bg-white"
    />
  </div>
</template>
