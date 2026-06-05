<template>
  <button
    :class="['consult-card', { 'consult-card--has-queue': hasQueue }]"
    type="button"
    :aria-label="ariaLabel || title"
    @click="$emit('click', $event)"
  >
    <div class="consult-card__content">
      <div class="consult-card__icon">
        <img class="consult-card__icon-img" :src="iconSrc" alt="" aria-hidden="true" />
      </div>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { assetUrl } from '../../utils/assetUrl.js'

defineOptions({
  name: 'ConsultEntryCard'
})

const props = defineProps({
  title: {
    type: String,
    default: '进入问诊室'
  },
  description: {
    type: String,
    default: '点击开始接诊患者'
  },
  icon: {
    type: String,
    default: 'assets/figma-home/consult-icon.svg'
  },
  hasQueue: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: ''
  }
})

defineEmits(['click'])

const iconSrc = computed(() => assetUrl(props.icon))
</script>

<style>
.consult-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 296px;
  overflow: hidden;
  border: 0;
  border-radius: var(--jh-radius-lg);
  background: linear-gradient(270deg, #ffc670 0%, #f99100 48%, #f47f01 100%);
  color: #ffffff;
  cursor: pointer;
  box-shadow: var(--jh-shadow);
}

.consult-card::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0));
  content: "";
  opacity: 0;
  transition: opacity 160ms ease;
}

.consult-card:hover::after,
.consult-card:focus-visible::after {
  opacity: 1;
}

.consult-card__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
}

.consult-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.1);
}

.consult-card__icon-img {
  width: 64px;
  height: 64px;
}

.consult-card h2,
.consult-card p {
  margin: 0;
}

.consult-card h2 {
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
}

.consult-card p {
  font-size: 16px;
  line-height: 24px;
}
</style>
