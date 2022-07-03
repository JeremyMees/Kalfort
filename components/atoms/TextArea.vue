<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: null },
  errors: { type: Array, default: [] },
})
</script>

<template>
  <div class="w-full">
    <div class="text-xs mb-1 flex flex-row gap-x-2 items-center">
      <label for="input">{{ label }}<span v-if="required" class="text-red-400">*</span></label>
    </div>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      name="input"
      class="w-full p-2 bg-inherit border-2 border-slate-500 focus-visible:ring ring-slate-400 rounded text-sm outline-none"
      :placeholder="placeholder ? placeholder : label"
      autocomplete="off"
      rows="10"
    />
    <div v-if="errors.length > 0" class="flex flex-col">
      <p v-for="error in errors" :key="error" class="text-red-400 text-xs pt-1">
        {{ error.$message }}
      </p>
    </div>
  </div>
</template>
