<script setup>
defineProps({
  transparent: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
  color: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary', 'danger'].includes(value)
    },
  },
})
</script>

<template>
  <div class="max-w-max">
    <button
      :type="type"
      class="call-to-action w-full group shadow-gray py-2 px-4 rounded outline-none focus-visible:ring active:scale-110 ease-in-out duration-300"
      :class="{
        'bg-indigo-400 ring-indigo-200 text-slate-900': color === 'primary' && !transparent,
        'text-indigo-400 ring-indigo-200': color === 'primary' && transparent,
        'bg-cyan-400 ring-cyan-200 text-slate-900': color === 'secondary' && !transparent,
        'text-cyan-400 ring-cyan-200': color === 'secondary' && transparent,
        'bg-red-400 ring-red-200 text-slate-900': color === 'danger' && !transparent,
        'text-red-400 ring-red-200': color === 'danger' && transparent,
      }"
    >
      <slot />
    </button>
  </div>
</template>
