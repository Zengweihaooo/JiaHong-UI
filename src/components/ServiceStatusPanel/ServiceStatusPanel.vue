<template>
  <section :class="['service-status-panel', `service-status-panel--${safeDensity}`]" :aria-label="ariaLabel">
    <div class="service-status-panel__row">
      <div class="service-status-panel__left">
        <span>{{ statusLabel }}</span>
        <StatusBadge :status="status" />
      </div>
      <button
        :class="['jh-switch service-status-panel__switch', { 'is-on': status !== offStatus }]"
        type="button"
        :aria-label="toggleLabel"
        :aria-pressed="status !== offStatus"
        @click="$emit('toggle-status')"
      ></button>
    </div>
    <div class="service-status-panel__services" aria-label="服务类型">
      <button
        v-for="service in services"
        :key="service.key"
        :class="['service-status-panel__service', { 'is-selected': service.enabled }]"
        type="button"
        role="checkbox"
        :aria-checked="Boolean(service.enabled)"
        :data-service-key="service.key"
        @click="$emit('toggle-service', service)"
      >
        <span class="jh-checkbox service-status-panel__check">
          <span class="jh-checkbox__icon" aria-hidden="true">
            <img class="jh-checkbox__mark" :src="checkmarkSrc" alt="" />
          </span>
          <span class="jh-checkbox__label service-status-panel__label">{{ service.label }}</span>
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
  name: 'ServiceStatusPanel'
})

const props = defineProps({
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
  density: {
    type: String,
    default: 'regular',
    validator: (value) => ['regular', 'compact'].includes(value)
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

const safeDensity = computed(() => (['regular', 'compact'].includes(props.density) ? props.density : 'regular'))
const checkmarkSrc = computed(() => assetUrl(props.checkmarkIcon))
</script>

<style>
.service-status-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.service-status-panel__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 16px 24px;
  border-radius: 6px;
  background: var(--jh-panel);
}

.service-status-panel__left {
  display: flex;
  align-items: center;
  gap: 24px;
  color: var(--jh-text-secondary);
  font-size: 14px;
  line-height: 22px;
}

.service-status-panel__services {
  display: grid;
  align-items: center;
  justify-content: center;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
}

.service-status-panel--regular .service-status-panel__services {
  height: 84px;
}

.service-status-panel__service {
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

.service-status-panel__service:hover {
  background-color: #f1f7ff;
}

.service-status-panel__service[aria-checked="false"] {
  background-color: var(--jh-panel);
  color: var(--jh-text-secondary);
}

.service-status-panel__check {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 0;
  max-width: 100%;
  white-space: normal;
}

.service-status-panel__label {
  min-width: 0;
  overflow: visible;
  text-align: center;
  text-overflow: clip;
  white-space: nowrap;
  word-break: keep-all;
}

.service-status-panel--compact .service-status-panel__service {
  height: 84px;
}

.service-status-panel__switch {
  flex-basis: 60px;
  width: 60px;
  min-width: 60px;
  height: 28px;
  min-height: 28px;
  max-height: 28px;
}

.service-status-panel__switch::after {
  top: 3px;
  width: 22px;
  height: 22px;
}

.service-status-panel__switch.is-on::after,
.service-status-panel__switch[aria-pressed="true"]::after {
  left: 35px;
}
</style>
