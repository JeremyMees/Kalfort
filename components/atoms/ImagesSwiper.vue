<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCards } from 'swiper'
import 'swiper/css'
defineProps({ images: { type: Array, required: true } })
</script>

<template>
  <Swiper :modules="[EffectCards]" effect="cards" auto-height loop grab-cursor class="max-w-[250px]">
    <SwiperSlide v-for="image in images" :key="image" class="max-h-[250px] bg-white rounded-xl overflow-hidden">
      <img :src="image" alt="character img" class="h-full w-full object-cover" />
    </SwiperSlide>
  </Swiper>
</template>
