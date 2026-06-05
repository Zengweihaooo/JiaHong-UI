<template>
  <section class="card card--compact service-card" :aria-label="ariaLabel">
    <h2 class="card__title">{{ title }}</h2>
    <div class="status-row">
      <div class="status-row__left">
        <span>{{ statusLabel }}</span>
        <StatusBadge :status="status" />
      </div>
      <button
        :class="['jh-switch', { 'is-on': status !== offStatus }]"
        type="button"
        :aria-label="toggleLabel"
        :aria-pressed="status !== offStatus"
        @click="$emit('toggle-status')"
      ></button>
    </div>
    <div class="service-list">
      <button
        v-for="service in services"
        :key="service.key"
        class="service-tile"
        type="button"
        role="checkbox"
        :aria-checked="Boolean(service.enabled)"
        @click="$emit('toggle-service', service)"
      >
        <span class="jh-checkbox">
          <span class="jh-checkbox__icon" aria-hidden="true">
            <img class="jh-checkbox__mark" :src="checkmarkSrc" alt="" />
          </span>
          <span class="jh-checkbox__label">{{ service.label }}</span>
        </span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import StatusBadge from '../StatusBadge/StatusBadge.vue'
import { assetUrl } from '../../utils/assetUrl.js'

defineOptions({
  name: 'ServiceStatusCard'
})

const props = defineProps({
  title: {
    type: String,
    default: '接诊状态与服务开关'
  },
  statusLabel: {
    type: String,
    default: '出诊状态'
  },
  status: {
    type: String,
    default: 'offline'
  },
  offStatus: {
    type: String,
    default: 'offline'
  },
  services: {
    type: Array,
    default: () => []
  },
  toggleLabel: {
    type: String,
    default: '切换出诊状态'
  },
  checkmarkIcon: {
    type: String,
    default: 'assets/figma-home/checkmark.svg'
  },
  ariaLabel: {
    type: String,
    default: '接诊状态与服务开关'
  }
})

defineEmits(['toggle-status', 'toggle-service'])

const checkmarkSrc = computed(() => assetUrl(props.checkmarkIcon))
</script>

<style>
.service-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 32px;
}

.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 16px 24px;
  border-radius: 6px;
  background: var(--jh-panel);
}

.status-row__left {
  display: flex;
  align-items: center;
  gap: 24px;
  color: var(--jh-text-secondary);
  font-size: 14px;
  line-height: 22px;
}

.service-list {
  display: grid;
  align-items: center;
  justify-content: center;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  height: 84px;
}

.service-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 84px;
  min-width: 0;
  padding: 10px 12px;
  border: 0;
  border-radius: 6px;
  background-color: var(--jh-panel);
  background-image: none;
  color: var(--jh-text-secondary);
  cursor: pointer;
  font-size: 14px;
  line-height: 22px;
  transition:
    background-color 160ms ease,
    box-shadow 160ms ease;
}

.service-tile .jh-checkbox {
  display: inline-flex;
  flex-wrap: nowrap;
  min-width: 0;
  max-width: 100%;
  white-space: nowrap;
}

.service-tile .jh-checkbox__label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
}

.service-tile:hover {
  background-color: #f1f7ff;
}

.service-tile[aria-checked="false"] {
  background-color: var(--jh-panel);
  color: var(--jh-text-secondary);
}
</style>
