<template>
  <span class="jh-type-icon message-item__icon" :class="`jh-type-icon--${safeType}`" aria-hidden="true">
    <img :src="iconSrc" alt="" />
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { assetUrl } from '../../utils/assetUrl.js'

defineOptions({
  name: 'TypeIcon'
})

const props = defineProps({
  type: {
    type: String,
    default: 'consult'
  },
  icons: {
    type: Object,
    default: () => ({})
  }
})

const defaultIcons = {
  video: 'assets/figma-room/video-consult.svg',
  text: 'assets/figma-room/text-consult.svg',
  consult: 'assets/figma-room/consult.svg'
}

const safeType = computed(() => (props.icons[props.type] || defaultIcons[props.type] ? props.type : 'consult'))
const iconSrc = computed(() => assetUrl(props.icons[props.type] || defaultIcons[safeType.value]))
</script>

<style>
.jh-type-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.jh-type-icon img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
