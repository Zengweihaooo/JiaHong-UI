<template>
  <span
    :class="['jh-duration-chip', `jh-duration-chip--${safeVariant}`, `jh-duration-chip--${tone}`]"
    :aria-label="`${label}${formatted}`"
  >
    <svg
      v-if="safeVariant === 'icon'"
      class="jh-duration-chip__clock"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="9" cy="9" r="8.3" stroke="currentColor" stroke-width="1.4" />
      <path d="M9 5.04V9l3.24 1.8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <strong>
      <span v-if="label" class="jh-duration-chip__prefix">{{ label }}</span>
      <span class="jh-duration-chip__value">{{ formatted }}</span>
    </strong>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { durationTone, formatDuration } from '../../utils/format.js'

defineOptions({
  name: 'DurationChip'
})

const props = defineProps({
  seconds: {
    type: Number,
    default: 0
  },
  variant: {
    type: String,
    default: 'icon'
  },
  label: {
    type: String,
    default: '持续时长：'
  }
})

const safeVariant = computed(() => (['icon', 'pill', 'plain'].includes(props.variant) ? props.variant : 'icon'))
const formatted = computed(() => formatDuration(props.seconds))
const tone = computed(() => durationTone(props.seconds))
</script>

<style>
.jh-duration-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  color: var(--jh-color-text-secondary);
  font-size: var(--jh-font-size-md);
  font-weight: 400;
  line-height: 22px;
  white-space: nowrap;
}

.jh-duration-chip--icon {
  gap: 10px;
  padding: 0 16px 0 8px;
  border-radius: var(--jh-radius-pill);
}

.jh-duration-chip--pill {
  padding: 0 16px;
  border-radius: var(--jh-radius-pill);
}

.jh-duration-chip--plain {
  padding: 0 10px;
}

.jh-duration-chip strong {
  display: inline-flex;
  font-weight: 400;
}

.jh-duration-chip__clock {
  flex: 0 0 auto;
  color: var(--jh-color-text-muted);
}

.jh-duration-chip--warning {
  color: var(--jh-color-warning);
}

.jh-duration-chip--warning .jh-duration-chip__clock {
  color: #eea870;
}

.jh-duration-chip--danger {
  color: var(--jh-color-danger);
}

.jh-duration-chip--danger .jh-duration-chip__clock {
  color: #e36d6d;
}
</style>
