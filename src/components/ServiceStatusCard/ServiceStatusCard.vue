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
  gap: 20px;
  min-height: 296px;
}

.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 73px;
  padding: 16px 32px;
  border-radius: 6px;
  background: #f8f8f9;
}

.status-row__left {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  color: var(--jh-text-secondary);
  font-size: 16px;
  line-height: 24px;
}

.service-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.service-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 102px;
  padding: 16px;
  border: 0;
  border-radius: 6px;
  background: #f8f8f9;
  cursor: pointer;
}

.jh-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--jh-text-secondary);
  font-size: 16px;
  line-height: 24px;
}

.jh-checkbox__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background: var(--jh-blue);
}

.jh-checkbox__mark {
  width: 16px;
  height: 16px;
}
</style>
