<template>
  <section class="card card--compact waiting-card" :aria-label="ariaLabel">
    <div class="waiting-card__left">
      <div class="waiting-card__heading">
        <h1 class="card__title">{{ title }}</h1>
        <p class="waiting-card__label">{{ label }}</p>
      </div>
      <p class="waiting-card__number">{{ total }}</p>
      <p class="waiting-card__hint">{{ hint }}</p>
    </div>
    <div class="waiting-card__right">
      <div v-for="item in normalizedItems" :key="item.key || item.label" class="queue-chip">
        <span class="queue-chip__name">{{ item.label }}</span>
        <span class="queue-chip__value">{{ item.value }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'WaitingStatusCard'
})

const props = defineProps({
  title: {
    type: String,
    default: '当前候诊状态'
  },
  label: {
    type: String,
    default: '当前候诊人数'
  },
  hint: {
    type: String,
    default: '请及时接诊患者'
  },
  total: {
    type: [Number, String],
    default: 0
  },
  items: {
    type: Array,
    default: () => []
  },
  ariaLabel: {
    type: String,
    default: '当前候诊状态'
  }
})

const normalizedItems = computed(() =>
  props.items.map((item) => ({
    key: item.key || item.label,
    label: item.label || '',
    value: item.value ?? 0
  }))
)
</script>

<style>
.card {
  overflow: hidden;
  border-radius: var(--jh-radius-lg);
  background: #ffffff;
  box-shadow: var(--jh-shadow);
}

.card--compact {
  padding: 32px;
}

.card__title {
  margin: 0;
  color: var(--jh-text-primary);
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
}

.waiting-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 178px;
  gap: 28px;
  min-height: 296px;
}

.waiting-card__left,
.waiting-card__right {
  display: flex;
  flex-direction: column;
}

.waiting-card__left {
  justify-content: space-between;
  min-width: 0;
}

.waiting-card__heading {
  display: grid;
  gap: 24px;
}

.waiting-card__label,
.waiting-card__hint {
  margin: 0;
  color: var(--jh-text-muted);
  font-size: 16px;
  line-height: 24px;
}

.waiting-card__number {
  margin: 0;
  color: rgba(0, 0, 0, 0.9);
  font-size: 64px;
  font-weight: 700;
  line-height: 72px;
}

.waiting-card__right {
  justify-content: center;
  gap: 14px;
}

.queue-chip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 59px;
  padding: 14px 24px;
  border-radius: 6px;
  background: #f8f8f9;
}

.queue-chip__name {
  color: var(--jh-text-secondary);
  font-size: 16px;
  line-height: 24px;
}

.queue-chip__value {
  color: rgba(0, 0, 0, 0.9);
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
}
</style>
