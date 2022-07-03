<script setup>
const emit = defineEmits(['image', 'file'])
defineProps({
  transparent: { type: Boolean, default: false },
  color: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary', 'danger'].includes(value)
    },
  },
})

const fileInput = ref(null)

function pickFile() {
  if (!fileInput.value.files || !fileInput.value.files[0]) return
  emit('file', fileInput.value.files[0])
  emit('image', URL.createObjectURL(fileInput.value.files[0]))
}
</script>

<template>
  <div>
    <Button :color="color" :transparent="transparent" @click="fileInput.click()">
      <slot />
    </Button>
    <input ref="fileInput" type="file" @input="pickFile" class="hidden" accept="image/*" />
  </div>
</template>
