<template>
  <span class="jh-avatar" :class="[`jh-avatar--${safeSize}`]" :aria-label="alt || name || '用户头像'">
    <img v-if="src && !imageFailed" :src="src" :alt="alt" @error="handleImageError" />
    <span v-else>{{ initials }}</span>
  </span>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

defineOptions({
  name: 'JhAvatar'
})

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md'
  }
})

const safeSize = computed(() => (['sm', 'md', 'lg'].includes(props.size) ? props.size : 'md'))
const initials = computed(() => String(props.name || '?').trim().slice(0, 2))
const imageFailed = ref(false)

watch(
  () => props.src,
  () => {
    imageFailed.value = false
  }
)

function handleImageError() {
  imageFailed.value = true
}
</script>

<style>
.jh-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: var(--jh-radius-pill);
  background: var(--jh-color-info-bg);
  color: var(--jh-color-primary);
  font-weight: 600;
}

.jh-avatar--sm {
  width: 28px;
  height: 28px;
  font-size: var(--jh-font-size-xs);
}

.jh-avatar--md {
  width: 32px;
  height: 32px;
  font-size: var(--jh-font-size-md);
}

.jh-avatar--lg {
  width: 44px;
  height: 44px;
  font-size: var(--jh-font-size-lg);
}

.jh-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
