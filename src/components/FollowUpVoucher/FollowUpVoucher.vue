<template>
  <section v-if="hasContent" :class="['jh-voucher', `jh-voucher--${safeVariant}`]" :aria-label="title">
    <h3 v-if="title" class="jh-voucher__title">{{ title }}</h3>

    <div v-if="normalizedVoices.length" class="jh-voucher__row">
      <span class="jh-voucher__label">{{ voiceLabel }}</span>
      <div class="jh-voucher__voices">
        <button
          v-for="(voice, index) in normalizedVoices"
          :key="`${voice.title}-${index}`"
          class="jh-voucher__voice"
          type="button"
          :aria-label="`${voice.title}，${voice.duration}秒`"
          @click="activeVoice = voice"
        >
          <span class="jh-voucher-wave" aria-hidden="true">
            <span v-for="(height, waveIndex) in voiceWaveHeights" :key="waveIndex" :style="{ '--wave-height': `${height}px` }"></span>
          </span>
          <span>{{ voice.duration }}”</span>
        </button>
      </div>
    </div>

    <div v-if="normalizedVoices.length && normalizedImages.length" class="jh-voucher__divider" aria-hidden="true"></div>

    <div v-if="normalizedImages.length" class="jh-voucher__row">
      <span class="jh-voucher__label">{{ imageLabel }}</span>
      <div class="jh-voucher__images">
        <button
          v-for="(image, index) in normalizedImages"
          :key="`${image.title}-${index}`"
          class="jh-voucher__image"
          type="button"
          :aria-label="`预览${image.title}`"
          @click="emit('preview-image', { image, index, images: normalizedImages })"
        >
          <span class="jh-voucher__thumb">
            <img :src="image.image" :alt="image.title" loading="lazy" />
          </span>
        </button>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <div
      :class="['jh-voucher-voice-overlay', { 'is-open': Boolean(activeVoice) }]"
      role="dialog"
      aria-modal="true"
      :aria-hidden="!activeVoice"
      @click.self="activeVoice = null"
    >
      <div class="jh-voucher-voice-dialog">
        <div class="jh-voucher-voice-dialog__header">
          <h2>{{ activeVoice?.title || voiceTitle }}</h2>
          <button class="jh-voucher-voice-dialog__close" type="button" :aria-label="`关闭${voiceTitle}`" @click="activeVoice = null"></button>
        </div>
        <div class="jh-voucher-voice-dialog__body">
          <button class="jh-voucher-voice-dialog__play" type="button" :aria-label="`播放${voiceTitle}`"></button>
          <span class="jh-voucher-wave" aria-hidden="true">
            <span v-for="(height, waveIndex) in voiceWaveHeights" :key="waveIndex" :style="{ '--wave-height': `${height}px` }"></span>
          </span>
          <span class="jh-voucher-voice-dialog__duration">{{ activeVoice?.duration || 0 }}”</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref } from 'vue'
import { assetUrl } from '../../utils/assetUrl.js'

defineOptions({
  name: 'FollowUpVoucher'
})

const props = defineProps({
  title: {
    type: String,
    default: '凭证'
  },
  variant: {
    type: String,
    default: 'mixed'
  },
  images: {
    type: Array,
    default: () => []
  },
  voices: {
    type: Array,
    default: () => []
  },
  imageLabel: {
    type: String,
    default: '图片凭证：'
  },
  voiceLabel: {
    type: String,
    default: '语音凭证：'
  },
  voiceTitle: {
    type: String,
    default: '语音凭证'
  }
})

const emit = defineEmits(['preview-image'])
const activeVoice = ref(null)
const voiceWaveHeights = [12, 18, 10, 20, 14, 8, 8, 6, 4, 10, 14, 14, 12, 10, 10, 8]

const safeVariant = computed(() => (['image', 'voice', 'mixed'].includes(props.variant) ? props.variant : 'mixed'))
const normalizedImages = computed(() =>
  (safeVariant.value === 'voice' ? [] : props.images).slice(0, 4).map((image, index) => ({
    title: image.title || `图片凭证${index + 1}`,
    image: assetUrl(image.image || image.src || 'assets/figma-consult/attachment-preview.png')
  }))
)
const normalizedVoices = computed(() =>
  (safeVariant.value === 'image' ? [] : props.voices).slice(0, 2).map((voice, index) => ({
    title: voice.title || `${props.voiceTitle}${index + 1}`,
    duration: Number(voice.duration || 0) || (index === 0 ? 8 : 7)
  }))
)
const hasContent = computed(() => normalizedImages.value.length > 0 || normalizedVoices.value.length > 0)
</script>

<style>
.jh-voucher {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: var(--jh-space-4);
  margin: 12px 12px 0;
  padding: var(--jh-space-3);
  border-radius: var(--jh-radius-lg);
  background: var(--jh-color-bg-surface);
  box-shadow: var(--jh-shadow-md);
}

.jh-voucher__title {
  position: relative;
  margin: 0;
  padding-left: 10px;
  color: var(--jh-color-text-primary);
  font-size: var(--jh-font-size-lg);
  font-weight: 400;
  line-height: 24px;
}

.jh-voucher__title::before {
  position: absolute;
  left: 0;
  top: 5px;
  width: 4px;
  height: 15px;
  border-radius: 1px;
  background: var(--jh-color-primary);
  content: "";
}

.jh-voucher__row {
  display: flex;
  align-items: center;
  gap: var(--jh-space-1);
  min-width: 0;
}

.jh-voucher__label {
  flex: 0 0 70px;
  color: var(--jh-color-text-secondary);
  font-size: var(--jh-font-size-md);
  line-height: 22px;
  white-space: nowrap;
}

.jh-voucher__images,
.jh-voucher__voices {
  display: flex;
  flex-wrap: wrap;
  gap: var(--jh-space-2);
  min-width: 0;
}

.jh-voucher__image,
.jh-voucher__voice {
  border: 0;
  background: var(--jh-color-bg-panel);
  cursor: pointer;
  font: inherit;
}

.jh-voucher__image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 3px;
  border-radius: 3px;
}

.jh-voucher__voice {
  display: inline-flex;
  align-items: center;
  gap: var(--jh-space-2);
  width: 80px;
  height: 32px;
  padding: 5px 8px 5px 10px;
  border-radius: var(--jh-radius-lg);
  color: var(--jh-color-text-secondary);
  font-size: var(--jh-font-size-md);
  line-height: 22px;
}

.jh-voucher__image:hover,
.jh-voucher__image:focus-visible,
.jh-voucher__voice:hover,
.jh-voucher__voice:focus-visible {
  background: #eef6ff;
  outline: 0;
}

.jh-voucher__image:focus-visible,
.jh-voucher__voice:focus-visible {
  outline: 2px solid var(--jh-color-primary);
  outline-offset: 2px;
}

.jh-voucher__thumb {
  display: block;
  width: 42px;
  height: 42px;
  overflow: hidden;
  border: 0.8px solid var(--jh-color-border-strong);
  border-radius: 1.5px;
  background: #fcfcfc;
}

.jh-voucher__thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.jh-voucher-wave {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1.5px;
  flex: 0 0 auto;
  width: 42px;
  height: 20px;
}

.jh-voucher-wave span {
  display: block;
  width: 1px;
  height: var(--wave-height, 10px);
  border-radius: var(--jh-radius-pill);
  background: #b8c6d7;
}

.jh-voucher__divider {
  width: 100%;
  height: 1px;
  background: var(--jh-color-border);
}

.jh-voucher-voice-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
}

.jh-voucher-voice-overlay.is-open {
  display: flex;
}

.jh-voucher-voice-dialog {
  width: min(360px, calc(100vw - 32px));
  padding: var(--jh-space-4);
  border-radius: var(--jh-radius-lg);
  background: var(--jh-color-bg-surface);
  box-shadow: var(--jh-shadow-lg);
}

.jh-voucher-voice-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--jh-space-3);
}

.jh-voucher-voice-dialog__header h2 {
  margin: 0;
  font-size: var(--jh-font-size-lg);
  font-weight: 500;
}

.jh-voucher-voice-dialog__close,
.jh-voucher-voice-dialog__play {
  border: 0;
  cursor: pointer;
}

.jh-voucher-voice-dialog__close {
  width: 28px;
  height: 28px;
  border-radius: var(--jh-radius-md);
  background:
    linear-gradient(45deg, transparent 45%, var(--jh-color-text-secondary) 45%, var(--jh-color-text-secondary) 55%, transparent 55%),
    linear-gradient(-45deg, transparent 45%, var(--jh-color-text-secondary) 45%, var(--jh-color-text-secondary) 55%, transparent 55%);
}

.jh-voucher-voice-dialog__body {
  display: flex;
  align-items: center;
  gap: var(--jh-space-3);
  margin-top: var(--jh-space-4);
}

.jh-voucher-voice-dialog__play {
  width: 32px;
  height: 32px;
  border-radius: var(--jh-radius-pill);
  background: var(--jh-color-info-bg);
  color: var(--jh-color-primary);
}

.jh-voucher-voice-dialog__play::before {
  display: block;
  width: 0;
  height: 0;
  margin: auto;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 10px solid currentColor;
  content: "";
}
</style>
