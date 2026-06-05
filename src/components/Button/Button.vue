<template>
  <button
    class="jh-button jh-btn"
    :class="[
      `jh-button--${safeTone}`,
      `jh-button--${safeSize}`,
      `jh-btn--${legacyTone}`,
      `jh-btn--${safeSize}`,
      { 'jh-button--block': block }
    ]"
    :type="type"
    :disabled="disabled || loading"
  >
    <span v-if="$slots.icon" class="jh-button__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
    <span class="jh-button__label">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'JhButton'
})

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  tone: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
})

const safeTone = computed(() =>
  ['primary', 'secondary', 'danger', 'neutral', 'text'].includes(props.tone) ? props.tone : 'primary'
)
const safeSize = computed(() => (['sm', 'md', 'lg'].includes(props.size) ? props.size : 'md'))
const legacyTone = computed(() => (safeTone.value === 'secondary' ? 'outline-secondary' : safeTone.value))
</script>

<style>
.jh-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--jh-space-2);
  border: 1px solid transparent;
  border-radius: var(--jh-radius-md);
  font-family: var(--jh-font-family);
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    opacity 160ms ease;
}

.jh-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.jh-button--block {
  width: 100%;
}

.jh-button--sm {
  min-height: 28px;
  padding: 4px 12px;
  font-size: var(--jh-font-size-xs);
}

.jh-button--md {
  min-height: 32px;
  padding: 5px 16px;
  font-size: var(--jh-font-size-md);
}

.jh-button--lg {
  min-height: 40px;
  padding: 8px 24px;
  font-size: var(--jh-font-size-lg);
}

.jh-button--primary {
  color: var(--jh-color-text-inverse);
  background: linear-gradient(270deg, var(--jh-color-primary-light), var(--jh-color-primary));
}

.jh-button--primary:not(:disabled):hover {
  background: var(--jh-color-primary-hover);
}

.jh-button--secondary {
  color: var(--jh-color-primary);
  background: var(--jh-color-bg-surface);
  border-color: var(--jh-color-primary);
}

.jh-button--danger {
  color: var(--jh-color-text-inverse);
  background: var(--jh-color-danger);
}

.jh-button--neutral {
  color: var(--jh-color-text-secondary);
  background: var(--jh-color-fill-muted);
}

.jh-button--text {
  min-height: auto;
  padding-inline: 0;
  color: var(--jh-color-primary);
  background: transparent;
}
</style>
