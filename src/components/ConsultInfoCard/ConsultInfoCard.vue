<template>
  <section v-if="hasContent" class="consult-info-card" :aria-label="title">
    <h3>{{ title }}</h3>

    <div v-if="description" class="consult-info-card__row">
      <span class="consult-info-card__label">{{ descriptionLabel }}</span>
      <p>{{ description }}</p>
    </div>

    <div v-if="normalizedImages.length || normalizedVoices.length" class="consult-info-card__row">
      <span class="consult-info-card__label">{{ caseLabel }}</span>
      <div class="consult-info-card__content">
        <div v-if="normalizedImages.length" class="consult-attachments">
          <button
            v-for="(image, index) in normalizedImages"
            :key="`${image.title}-${index}`"
            :class="[
              'consult-attachment',
              isImageViewed(image, index) ? 'consult-attachment--read' : 'consult-attachment--unread'
            ]"
            type="button"
            :aria-label="`${isImageViewed(image, index) ? '已读' : '未读'}病例附件：预览${image.title}`"
            :data-consult-attachment-status="isImageViewed(image, index) ? 'read' : 'unread'"
            @click="previewImage(image, index)"
          >
            <span class="consult-attachment__thumb">
              <img :src="image.image" :alt="image.title" loading="lazy" />
            </span>
          </button>
        </div>

        <div v-if="normalizedVoices.length" class="consult-info-card__voices" aria-label="病例信息语音">
          <button
            v-for="(voice, index) in normalizedVoices"
            :key="`${voice.title}-${index}`"
            :class="[
              'followup-voucher-voice followup-voucher-item',
              isVoiceViewed(voice, index) ? 'followup-voucher-item--viewed' : 'followup-voucher-item--unviewed',
              isVoiceActive(voice, index) ? 'is-playing' : ''
            ]"
            type="button"
            :aria-label="`播放${voice.title}，${voice.duration}秒`"
            :aria-pressed="String(isVoiceActive(voice, index))"
            data-followup-voucher-item="true"
            :data-followup-voucher-status="isVoiceViewed(voice, index) ? 'viewed' : 'unviewed'"
            :data-followup-voice-title="voice.title"
            :data-followup-voice-duration="voice.duration"
            :data-followup-voice-step="isVoiceActive(voice, index) ? String(activeVoiceWaveStep) : null"
            @click="openVoice(voice, index)"
          >
            <span class="followup-voice-time">
              <span data-followup-voice-current>{{ getVoiceCurrentDuration(voice, index) }}"</span>
            </span>
            <VoiceWaveform />
          </button>
        </div>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <div
      v-if="activeVoice"
      :class="['jh-voucher-voice-overlay', { 'is-open': Boolean(activeVoice) }]"
      role="dialog"
      aria-modal="true"
      aria-hidden="false"
      @click.self="closeVoice"
    >
      <div class="jh-voucher-voice-dialog">
        <div class="jh-voucher-voice-dialog__header">
          <h2>{{ activeVoice?.title || voiceTitle }}</h2>
          <button class="jh-voucher-voice-dialog__close" type="button" :aria-label="`关闭${voiceTitle}`" @click="closeVoice"></button>
        </div>
        <div class="jh-voucher-voice-dialog__body">
          <button class="jh-voucher-voice-dialog__play" type="button" :aria-label="`播放${voiceTitle}`"></button>
          <span class="jh-voucher-wave" aria-hidden="true">
            <span v-for="(height, waveIndex) in dialogVoiceWaveHeights" :key="waveIndex" :style="{ '--wave-height': `${height}px` }"></span>
          </span>
          <span class="jh-voucher-voice-dialog__duration">{{ activeVoice?.duration || 0 }}”</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, h, onBeforeUnmount, ref } from 'vue'
import { assetUrl } from '../../utils/assetUrl.js'

defineOptions({
  name: 'ConsultInfoCard'
})

const props = defineProps({
  title: {
    type: String,
    default: '咨询信息'
  },
  description: {
    type: String,
    default: ''
  },
  descriptionLabel: {
    type: String,
    default: '病情描述：'
  },
  caseLabel: {
    type: String,
    default: '病例信息：'
  },
  images: {
    type: Array,
    default: () => []
  },
  voices: {
    type: Array,
    default: () => []
  },
  voiceTitle: {
    type: String,
    default: '病例语音'
  }
})

const emit = defineEmits(['preview-image'])
const activeVoice = ref(null)
const activeVoiceKey = ref('')
const activeVoiceRemaining = ref(0)
const activeVoiceWaveStep = ref(0)
const viewedImageKeys = ref(new Set())
const viewedVoiceKeys = ref(new Set())
const dialogVoiceWaveHeights = [12, 18, 10, 20, 14, 8, 8, 6, 4, 10, 14, 14, 12, 10, 10, 8]
const followUpVoiceWaveFrameMs = 250
const followUpVoiceWaveFrameCount = 4
let activeVoiceTimer = 0
let activeVoiceWaveTimer = 0

const normalizedImages = computed(() =>
  props.images.map((image, index) =>
    typeof image === 'string'
      ? {
          title: image || `附件${index + 1}`,
          image: assetUrl('assets/figma-consult/attachment-preview.png')
        }
      : {
          title: image.title || `附件${index + 1}`,
          image: assetUrl(image.image || image.src || 'assets/figma-consult/attachment-preview.png')
        }
  )
)

const normalizedVoices = computed(() =>
  props.voices.map((voice, index) =>
    typeof voice === 'string'
      ? {
          title: voice || `${props.voiceTitle}${index + 1}`,
          duration: index === 0 ? 8 : 7
        }
      : {
          title: voice.title || `${props.voiceTitle}${index + 1}`,
          duration: Number(voice.duration || 0) || (index === 0 ? 8 : 7)
        }
  )
)

const hasContent = computed(() => Boolean(props.description) || normalizedImages.value.length > 0 || normalizedVoices.value.length > 0)

function imageKey(image, index) {
  return `${image.title || '附件'}-${image.image || ''}-${index}`
}

function voiceKey(voice, index) {
  return `${voice.title || props.voiceTitle}-${voice.duration || 0}-${index}`
}

function markViewed(keySet, key) {
  if (keySet.value.has(key)) return
  keySet.value = new Set([...keySet.value, key])
}

function isImageViewed(image, index) {
  return viewedImageKeys.value.has(imageKey(image, index))
}

function isVoiceViewed(voice, index) {
  return viewedVoiceKeys.value.has(voiceKey(voice, index))
}

function isVoiceActive(voice, index) {
  return Boolean(activeVoice.value) && activeVoiceKey.value === voiceKey(voice, index)
}

function getVoiceCurrentDuration(voice, index) {
  return isVoiceActive(voice, index) ? activeVoiceRemaining.value : voice.duration
}

function previewImage(image, index) {
  markViewed(viewedImageKeys, imageKey(image, index))
  emit('preview-image', { image, index, images: normalizedImages.value })
}

function openVoice(voice, index) {
  const key = voiceKey(voice, index)
  if (activeVoiceKey.value === key) {
    stopFollowUpVoicePlayback()
    return
  }
  stopFollowUpVoicePlayback()
  markViewed(viewedVoiceKeys, key)
  activeVoiceKey.value = key
  activeVoice.value = voice
  activeVoiceRemaining.value = Math.max(1, Number(voice.duration || 0))
  activeVoiceWaveStep.value = 0
  activeVoiceWaveTimer = window.setInterval(() => {
    activeVoiceWaveStep.value = (activeVoiceWaveStep.value + 1) % followUpVoiceWaveFrameCount
  }, followUpVoiceWaveFrameMs)
  activeVoiceTimer = window.setInterval(() => {
    activeVoiceRemaining.value = Math.max(0, activeVoiceRemaining.value - 1)
    if (activeVoiceRemaining.value <= 0) stopFollowUpVoicePlayback()
  }, 1000)
}

function closeVoice() {
  stopFollowUpVoicePlayback()
}

function stopFollowUpVoicePlayback() {
  window.clearInterval(activeVoiceTimer)
  window.clearInterval(activeVoiceWaveTimer)
  activeVoiceTimer = 0
  activeVoiceWaveTimer = 0
  activeVoice.value = null
  activeVoiceKey.value = ''
  activeVoiceRemaining.value = 0
  activeVoiceWaveStep.value = 0
}

onBeforeUnmount(stopFollowUpVoicePlayback)

function VoiceWaveform() {
  return h(
    'span',
    { class: 'followup-voice-wave', 'aria-hidden': 'true' },
    h(
      'svg',
      { class: 'followup-voice-wave__icon', viewBox: '0 0 24 24', focusable: 'false' },
      [
        h('circle', { class: 'followup-voice-wave__base', cx: '6', cy: '12', r: '2.1' }),
        h('path', { class: 'followup-voice-wave__base', d: 'M10 8.8c1.1.8 1.8 1.9 1.8 3.2s-.7 2.4-1.8 3.2' }),
        h('path', { class: 'followup-voice-wave__base', d: 'M13.2 6.2c1.9 1.4 3 3.4 3 5.8s-1.1 4.4-3 5.8' }),
        h('path', { class: 'followup-voice-wave__base', d: 'M16.5 3.8c2.7 2 4.2 4.8 4.2 8.2s-1.5 6.2-4.2 8.2' }),
        h('circle', { class: 'followup-voice-wave__active followup-voice-wave__active--1', cx: '6', cy: '12', r: '2.1' }),
        h('path', { class: 'followup-voice-wave__active followup-voice-wave__active--1', d: 'M10 8.8c1.1.8 1.8 1.9 1.8 3.2s-.7 2.4-1.8 3.2' }),
        h('path', { class: 'followup-voice-wave__active followup-voice-wave__active--2', d: 'M13.2 6.2c1.9 1.4 3 3.4 3 5.8s-1.1 4.4-3 5.8' }),
        h('path', { class: 'followup-voice-wave__active followup-voice-wave__active--3', d: 'M16.5 3.8c2.7 2 4.2 4.8 4.2 8.2s-1.5 6.2-4.2 8.2' })
      ]
    )
  )
}
</script>

<style>
.consult-info-card {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  margin: 12px 12px 0;
  padding: 12px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow:
    0 6px 16px -8px rgba(16, 42, 67, 0.08),
    0 1px 3px rgba(16, 42, 67, 0.05);
}

.consult-info-card h3 {
  position: relative;
  margin: 0;
  padding-left: 10px;
  color: var(--jh-color-text-primary);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.consult-info-card h3::before {
  position: absolute;
  left: 0;
  top: 5px;
  width: 4px;
  height: 15px;
  border-radius: 1px;
  background: var(--jh-color-primary);
  content: "";
}

.consult-info-card__row {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  min-width: 0;
}

.consult-info-card__row + .consult-info-card__row {
  margin-top: -4px;
  padding-top: 12px;
  border-top: 1px solid #e5e8eb;
}

.consult-info-card__label {
  flex: 0 0 auto;
  color: var(--jh-color-text-secondary);
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
}

.consult-info-card p {
  min-width: 0;
  margin: 0;
  color: var(--jh-color-text-secondary);
  font-size: 14px;
  line-height: 22px;
}

.consult-info-card__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.consult-info-card__voices {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
  min-width: 0;
}

.consult-attachments {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
}

.consult-attachment {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 3px;
  border: 0;
  border-radius: 3px;
  background: #f8f8f9;
  cursor: pointer;
}

.consult-info-card .consult-attachment--unread {
  border: 1.5px solid #f53f3f;
  box-shadow: 0 0 0 2px rgba(245, 63, 63, 0.08);
}

.consult-info-card .consult-attachment--read {
  border: 1.5px solid #00b578;
  box-shadow: 0 0 0 2px rgba(0, 181, 120, 0.1);
}

.consult-attachment:hover,
.consult-attachment:focus-visible {
  background: #eef6ff;
}

.consult-attachment:focus-visible {
  outline: 2px solid var(--jh-color-primary);
  outline-offset: 2px;
}

.consult-attachment__thumb {
  display: block;
  width: 42px;
  height: 42px;
  overflow: hidden;
  border: 0.8px solid #d8dde1;
  border-radius: 1.5px;
  background: #fcfcfc;
}

.consult-attachment__thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.followup-voucher-voice {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 9px;
  width: 86px;
  height: 36px;
  margin-left: 6px;
  padding: 7px 12px 7px 13px;
  border: 1px solid #e5e8eb;
  border-radius: 9px;
  background: #f6f7f8;
  color: #1e2939;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  box-shadow: 0 1px 2px rgba(16, 42, 67, 0.03);
}

.followup-voucher-voice::before {
  position: absolute;
  top: 50%;
  left: -5px;
  width: 9px;
  height: 9px;
  border-bottom: 1px solid #e5e8eb;
  border-left: 1px solid #e5e8eb;
  border-radius: 2px;
  background: inherit;
  content: "";
  transform: translateY(-50%) rotate(45deg);
}

.followup-voucher-voice:hover,
.followup-voucher-voice:focus-visible {
  background: #eef1f4;
  border-color: #d8dde1;
  outline: 0;
}

.followup-voucher-voice:focus-visible {
  outline: 2px solid var(--jh-color-primary);
  outline-offset: 2px;
}

.followup-voucher-item {
  border: 1.5px solid #f53f3f;
  box-shadow: 0 0 0 2px rgba(245, 63, 63, 0.08);
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.followup-voucher-item--viewed {
  border-color: #00b578;
  box-shadow: 0 0 0 2px rgba(0, 181, 120, 0.1);
}

.followup-voucher-voice.followup-voucher-item,
.followup-voucher-voice.followup-voucher-item--viewed {
  border-color: #e5e8eb;
}

.followup-voice-time {
  display: inline-flex;
  flex: 0 0 auto;
  color: #1e2939;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
}

.followup-voice-wave {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
}

.followup-voice-wave__icon {
  display: block;
  width: 20px;
  height: 20px;
}

.followup-voice-wave__base,
.followup-voice-wave__active {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.followup-voice-wave__base {
  stroke: rgba(30, 41, 57, 0.24);
}

.followup-voice-wave__base:first-child {
  fill: rgba(30, 41, 57, 0.24);
  stroke: none;
}

.followup-voice-wave__active {
  opacity: 0;
  stroke: #1e2939;
  transition: opacity 160ms ease;
}

.followup-voice-wave__active--1 {
  fill: #1e2939;
  stroke: none;
}

.followup-voucher-voice[data-followup-voice-step="1"] .followup-voice-wave__active--1,
.followup-voucher-voice[data-followup-voice-step="2"] .followup-voice-wave__active--1,
.followup-voucher-voice[data-followup-voice-step="2"] .followup-voice-wave__active--2,
.followup-voucher-voice[data-followup-voice-step="3"] .followup-voice-wave__active {
  opacity: 1;
}

.followup-voucher-item--viewed:not(.is-playing) .followup-voice-wave__active {
  opacity: 1;
}
</style>
