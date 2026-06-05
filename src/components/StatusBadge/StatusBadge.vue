<template>
  <span
    class="jh-status-badge"
    :class="[`jh-status-badge--${resolvedTone}`, { 'jh-status-badge--dot': dot }]"
    role="status"
  >
    <span v-if="dot" class="jh-status-badge__dot" aria-hidden="true" />
    <slot>{{ displayLabel }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { statusLabel } from '../../utils/format.js'

defineOptions({
  name: 'StatusBadge'
})

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  tone: {
    type: String,
    default: '',
    validator: (value) =>
      ['', 'neutral', 'success', 'warning', 'danger', 'info', 'online', 'busy', 'offline'].includes(value)
  },
  dot: {
    type: Boolean,
    default: true
  }
})

const resolvedTone = computed(() => props.tone || props.status || 'neutral')
const displayLabel = computed(() => props.label || statusLabel(props.status || resolvedTone.value))
</script>

<style>
.jh-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 24px;
  padding: 2px 10px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: var(--jh-font-size-sm);
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
  vertical-align: middle;
}

.jh-status-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
  flex: 0 0 auto;
}

.jh-status-badge--neutral {
  color: var(--jh-color-text-secondary);
  background: var(--jh-color-fill-muted);
  border-color: var(--jh-color-border);
}

.jh-status-badge--success {
  color: var(--jh-color-success);
  background: var(--jh-color-success-bg);
  border-color: var(--jh-color-success-border);
}

.jh-status-badge--warning {
  color: var(--jh-color-warning);
  background: var(--jh-color-warning-bg);
  border-color: var(--jh-color-warning-border);
}

.jh-status-badge--danger {
  color: var(--jh-color-danger);
  background: var(--jh-color-danger-bg);
  border-color: var(--jh-color-danger-border);
}

.jh-status-badge--info {
  color: var(--jh-color-info);
  background: var(--jh-color-info-bg);
  border-color: var(--jh-color-info-border);
}

.jh-status-badge--online {
  color: var(--jh-color-online);
  background: var(--jh-color-online-bg);
}

.jh-status-badge--busy {
  color: var(--jh-color-busy);
  background: var(--jh-color-busy-bg);
}

.jh-status-badge--offline {
  color: var(--jh-color-offline);
  background: var(--jh-color-offline-bg);
}

.jh-status-badge:not(.jh-status-badge--dot) {
  gap: 0;
}
</style>
