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
  width: 100%;
  height: 240px;
  border: 0;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  color: #ffffff;
  background: linear-gradient(270deg, var(--jh-blue-light), var(--jh-blue));
  box-shadow:
    0 1px 3px rgba(16, 42, 67, 0.05),
    0 6px 16px -8px rgba(16, 42, 67, 0.08);
  isolation: isolate;
  outline: none;
  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
}

.consult-card::before {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: linear-gradient(87deg, rgba(249, 187, 0, 0.08) 0%, rgba(255, 198, 112, 0.38) 100%);
  content: "";
  opacity: 0;
  pointer-events: none;
  transition: opacity 320ms cubic-bezier(0.16, 1, 0.3, 1);
}

.consult-card::after {
  position: absolute;
  inset: 0;
  z-index: 1;
  content: "";
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0));
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease, border-color 0.18s ease;
}

.consult-card--has-queue {
  background: linear-gradient(270deg, #ffc670 0%, #f99100 48%, #f47f01 100%);
}

.consult-card--has-queue::before {
  opacity: 1;
}

.consult-card:hover,
.consult-card:focus-visible,
.consult-card.is-selected {
  transform: translateY(-3px);
  filter: saturate(1.05);
  box-shadow: 0 18px 36px -18px rgba(0, 99, 255, 0.72), 0 0 0 4px rgba(10, 119, 255, 0.16);
}

.consult-card--has-queue:hover,
.consult-card--has-queue:focus-visible,
.consult-card--has-queue.is-selected {
  box-shadow: 0 18px 36px -18px rgba(249, 145, 0, 0.72), 0 0 0 4px rgba(255, 184, 71, 0.24);
}

.consult-card:hover::after,
.consult-card:focus-visible::after,
.consult-card.is-selected::after {
  border-color: rgba(255, 255, 255, 0.58);
  opacity: 1;
}

.consult-card:active,
.consult-card.is-selected {
  transform: translateY(-1px) scale(0.997);
}

.consult-card__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 240px;
  padding: 24px 32px;
  border-radius: 12px;
  filter: drop-shadow(0 1px 1.5px rgba(16, 42, 67, 0.05))
    drop-shadow(0 6px 8px rgba(16, 42, 67, 0.08));
}

.consult-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 121px;
  height: 114px;
  margin-bottom: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  box-shadow: 0 1px 4px rgba(29, 74, 131, 0.15);
  transition: background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
}

.consult-card:hover .consult-card__icon,
.consult-card:focus-visible .consult-card__icon,
.consult-card.is-selected .consult-card__icon {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 22px rgba(29, 74, 131, 0.2);
}

.consult-card__icon svg,
.consult-card__icon-img {
  width: 88px;
  height: 88px;
}

.consult-card h2 {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
}

.consult-card p {
  margin: 0;
  font-size: 12px;
  line-height: 20px;
}
</style>
