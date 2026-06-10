<template>
  <button
    type="button"
    :class="['jh-disease-option', { 'jh-disease-option--selected': selected }]"
    :aria-pressed="selected ? 'true' : 'false'"
  >
    <span class="jh-disease-option__label">{{ label }}</span>
  </button>
</template>

<script setup>
defineOptions({
  name: 'DiseaseOption'
})

defineProps({
  label: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})
</script>

<style>
.jh-disease-option {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 32px;
  padding: 5px 12px;
  border: 1px solid var(--jh-color-border-strong);
  border-radius: var(--jh-radius-sm);
  background: var(--jh-color-bg-surface);
  color: var(--jh-color-text);
  cursor: pointer;
  font-family: var(--jh-font-family);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  white-space: nowrap;
  transition:
    border-color 160ms ease,
    color 160ms ease,
    background-color 160ms ease;
}

.jh-disease-option:hover {
  border-color: var(--jh-color-primary-hover);
  color: var(--jh-color-primary-hover);
}

.jh-disease-option--selected,
.jh-disease-option--selected:hover {
  border-color: var(--jh-color-primary);
  color: var(--jh-color-primary);
  background: var(--jh-color-info-bg);
}

.jh-disease-option__label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
