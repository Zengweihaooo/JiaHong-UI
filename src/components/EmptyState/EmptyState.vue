<template>
  <div class="jh-empty-state" :style="emptyStateStyle">
    <img v-if="image" class="jh-empty-state__image" :src="image" alt="" aria-hidden="true" />
    <div class="jh-empty-state__copy">
      <h3 v-if="title">{{ title }}</h3>
      <p v-if="description">{{ description }}</p>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'EmptyState'
})

const props = defineProps({
  image: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '暂无数据'
  },
  description: {
    type: String,
    default: ''
  },
  imageWidth: {
    type: [Number, String],
    default: 160
  },
  imageHeight: {
    type: [Number, String],
    default: 160
  },
  imageFit: {
    type: String,
    default: 'contain',
    validator: (value) => ['contain', 'cover', 'fill', 'none', 'scale-down'].includes(value)
  }
})

const emptyStateStyle = computed(() => ({
  '--jh-empty-state-image-width': toCssSize(props.imageWidth),
  '--jh-empty-state-image-height': toCssSize(props.imageHeight),
  '--jh-empty-state-image-fit': props.imageFit
}))

function toCssSize(value) {
  if (typeof value === 'number') return `${value}px`
  return value || 'auto'
}
</script>

<style>
.jh-empty-state {
  display: grid;
  justify-items: center;
  gap: var(--jh-space-4);
  padding: var(--jh-space-6);
  color: var(--jh-color-text-secondary);
  text-align: center;
}

.jh-empty-state__image {
  display: block;
  width: var(--jh-empty-state-image-width, 160px);
  height: var(--jh-empty-state-image-height, 160px);
  max-width: 100%;
  object-fit: var(--jh-empty-state-image-fit, contain);
}

.jh-empty-state__copy {
  display: grid;
  gap: var(--jh-space-2);
}

.jh-empty-state h3,
.jh-empty-state p {
  margin: 0;
}

.jh-empty-state h3 {
  color: var(--jh-color-text-primary);
  font-size: var(--jh-font-size-lg);
  font-weight: 600;
}

.jh-empty-state p {
  color: var(--jh-color-text-muted);
  font-size: var(--jh-font-size-md);
}
</style>
