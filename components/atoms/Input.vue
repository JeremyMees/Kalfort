<script setup>
import Eye from '~/assets/icons/eye.svg'
import EyeClosed from '~/assets/icons/eye-closed.svg'

defineEmits(['update:modelValue'])
const typeValue = ref()
const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, required: true },
  min: { type: Number, default: null },
  max: { type: Number, default: null },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: null },
  errors: { type: Array, default: [] },
})

onMounted(() => {
  typeValue.value = props.type
})
</script>

<template>
  <div class="w-full">
    <div class="text-xs mb-1 flex flex-row gap-x-2 items-center">
      <label for="input">{{ label }}<span v-if="required" class="text-red-400">*</span></label>
    </div>
    <div class="relative">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="typeValue"
        :min="min"
        :max="max"
        name="input"
        class="w-full px-2 !bg-slate-900 border-2 border-slate-500 focus-visible:ring ring-slate-400 rounded h-10 text-sm outline-none"
        :placeholder="placeholder ? placeholder : label"
        autocomplete="off"
      />
      <Eye
        v-if="typeValue === 'password' && type === 'password'"
        class="h-5 w-5 text-white absolute right-2 top-1/2 -translate-y-1/2"
        @click="typeValue = 'text'"
      />
      <EyeClosed
        v-if="typeValue === 'text' && type === 'password'"
        class="h-5 w-5 text-white absolute right-2 top-1/2 -translate-y-1/2"
        @click="typeValue = 'password'"
      />
    </div>
    <div v-if="errors.length > 0" class="flex flex-col">
      <p v-for="error in errors" :key="error" class="text-red-400 text-xs pt-1">
        {{ error.$message }}
      </p>
    </div>
  </div>
</template>
