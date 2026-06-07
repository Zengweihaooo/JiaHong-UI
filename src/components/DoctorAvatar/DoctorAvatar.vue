<template>
  <Avatar :src="avatarSrc" :name="name" :alt="alt" :size="size" />
</template>

<script setup>
import { computed } from 'vue'
import Avatar from '../Avatar/Avatar.vue'
import { assetUrl } from '../../utils/assetUrl.js'

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

const defaultAvatarPath = computed(() =>
  props.context === 'room'
    ? 'assets/figma-consult/avatar-source.png'
    : 'assets/figma-home/avatar-source.png'
)

const avatarSrc = computed(() => props.src || assetUrl(defaultAvatarPath.value))
</script>
