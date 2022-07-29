<script setup>
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  label: { type: String, required: true },
})
const emit = defineEmits(['update:modelValue'])
const toggleValue = ref()

onMounted(() => (toggleValue.value = props.modelValue))

function toggle() {
  toggleValue.value = !toggleValue.value
  emit('update:modelValue', toggleValue.value)
}
</script>

<template>
  <div class="flex flex-row gap-2 cursor-pointer items-center focus:outline-none max-w-max" @click="toggle">
    <div class="relative w-12 h-6 group focus:outline-none" tabindex="0" v-on:keyup.enter="toggle">
      <div
        class="absolute top-1/2 -translate-y-1/2 cursor-pointer rounded-full w-full h-2 ease-in-out duration-300 shadow-inner"
        :class="{ 'bg-indigo-700': toggleValue, 'bg-indigo-300': !toggleValue }"
      />
      <div
        class="absolute rounded-full left-1 bottom-1 bg-indigo-400 border-2 border-transparent group-focus:border-indig0-700 w-4 h-4 shadow-gray ease-in-out duration-300"
        :class="{ 'translate-x-[24px]': toggleValue, 'translate-x-0': !toggleValue }"
      />
    </div>
    <p class="text-xs" :class="{ 'text-green-300': toggleValue, 'text-red-300': !toggleValue }">{{ label }}</p>
  </div>
</template>
