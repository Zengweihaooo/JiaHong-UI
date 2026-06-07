<template>
  <section class="card card--compact service-card" :aria-label="ariaLabel">
    <h2 class="card__title">{{ title }}</h2>
    <ServiceStatusPanel
      :status-label="statusLabel"
      :status="status"
      :off-status="offStatus"
      :services="services"
      :toggle-label="toggleLabel"
      :checkmark-icon="checkmarkIcon"
      :aria-label="ariaLabel"
      density="regular"
      @toggle-status="emit('toggle-status')"
      @toggle-service="(service) => emit('toggle-service', service)"
    />
  </section>
</template>

<script setup>
import ServiceStatusPanel from '../ServiceStatusPanel/ServiceStatusPanel.vue'

defineOptions({
  name: 'ServiceStatusCard'
})

defineProps({
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

const emit = defineEmits(['toggle-status', 'toggle-service'])
</script>

<style>
.service-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 32px;
}
</style>
