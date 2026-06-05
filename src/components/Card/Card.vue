<template>
  <section class="jh-card" :class="[`jh-card--${padding}`]">
    <header v-if="$slots.header || title" class="jh-card__header">
      <slot name="header">
        <h3>{{ title }}</h3>
      </slot>
    </header>
    <div class="jh-card__body">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineOptions({
  name: 'JhCard'
})

defineProps({
  title: {
    type: String,
    default: ''
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
  }
})
</script>

<style>
.jh-card {
  border: 1px solid var(--jh-color-border);
  border-radius: var(--jh-radius-lg);
  background: var(--jh-color-bg-surface);
  box-shadow: var(--jh-shadow-sm);
}

.jh-card--none {
  padding: 0;
}

.jh-card--sm {
  padding: var(--jh-space-3);
}

.jh-card--md {
  padding: var(--jh-space-4);
}

.jh-card--lg {
  padding: var(--jh-space-6);
}

.jh-card__header {
  margin-bottom: var(--jh-space-3);
}

.jh-card__header h3 {
  margin: 0;
  font-size: var(--jh-font-size-lg);
  font-weight: 600;
}
</style>
