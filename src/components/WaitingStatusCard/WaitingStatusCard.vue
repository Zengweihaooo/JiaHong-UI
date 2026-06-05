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
.waiting-card {
  display: flex;
  gap: 16px;
  padding: 24px;
}

.waiting-card__left {
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 120px;
  height: 192px;
}

.waiting-card__heading {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.waiting-card__label {
  margin: 0;
  color: var(--jh-text-secondary);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
}

.waiting-card__number {
  margin: 0;
  color: var(--jh-text-primary);
  font-size: 56px;
  font-weight: 700;
  line-height: 64px;
}

.waiting-card__hint {
  margin: 0;
  color: var(--jh-text-tertiary);
  font-size: 12px;
  line-height: 20px;
}

.waiting-card__right {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 144px;
  margin-left: auto;
  padding-top: 24px;
}

.queue-chip {
  display: flex;
  align-items: center;
  gap: 18px;
  width: 144px;
  height: 48px;
  padding: 10px 28px 10px 20px;
  border-radius: 6px;
  background: var(--jh-panel);
}

.queue-chip__name {
  width: 56px;
  color: var(--jh-text-secondary);
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
}

.queue-chip__value {
  color: var(--jh-text-primary);
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
}
</style>
