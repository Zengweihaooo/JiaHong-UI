<template>
  <span :class="['jh-read-tag', `jh-read-tag--${safeStatus}`]">
    <slot>{{ displayLabel }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'ReadTag'
})

const props = defineProps({
  status: {
    type: String,
    default: 'unread'
  },
  text: {
    type: String,
    default: ''
  }
})

const safeStatus = computed(() => (props.status === 'read' ? 'read' : 'unread'))
const displayLabel = computed(() => props.text || (safeStatus.value === 'read' ? '已读' : '未读'))
</script>

<style>
.jh-read-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  min-width: 42px;
  height: 22px;
  padding: 0 9px;
  border-radius: var(--jh-radius-sm);
  font-size: var(--jh-font-size-xs);
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  white-space: nowrap;
}

.jh-read-tag--read {
  background: var(--jh-color-fill-muted);
  color: #7a8898;
}

.jh-read-tag--unread {
  background: #ffe7d6;
  color: #f97316;
}
</style>
