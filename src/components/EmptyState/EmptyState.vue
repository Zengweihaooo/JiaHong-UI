<template>
  <div class="jh-empty-state">
    <img v-if="image" class="jh-empty-state__image" :src="image" alt="" aria-hidden="true" />
    <div class="jh-empty-state__copy">
      <h3 v-if="title">{{ title }}</h3>
      <p v-if="description">{{ description }}</p>
      <slot />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'EmptyState'
})

defineProps({
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
  }
})
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
  width: min(160px, 60%);
  height: auto;
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
