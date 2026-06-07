<template>
  <Avatar :src="src" :name="name" :alt="alt" :size="size" />
</template>

<script setup>
import Avatar from '../Avatar/Avatar.vue'

defineOptions({
  name: 'DoctorAvatar'
})

const props = defineProps({
  name: {
    type: String,
    default: '张医生'
  },
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'sm'
  },
  context: {
    type: String,
    default: 'home',
    validator: (value) => ['home', 'room'].includes(value)
  }
})
</script>
