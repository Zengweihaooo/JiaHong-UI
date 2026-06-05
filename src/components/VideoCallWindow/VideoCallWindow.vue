<template>
  <div
    :class="['video-window', { 'is-media-off': !cameraOn || !micOn }]"
    data-video-controls
  >
    <div class="video-window__stage" aria-label="视频通话画面">
      <div class="video-window__pane video-window__pane--patient">
        <img class="video-window__main" :src="patientImageUrl" :alt="patientAlt" />
      </div>
      <div
        :class="[
          'video-window__pane video-window__pane--doctor video-window__pip video-window__pip--local',
          {
            'is-camera-off': !cameraOn,
            'is-camera-loading': cameraLoading,
            'is-camera-ready': cameraReady,
            'is-camera-error': cameraError
          }
        ]"
      >
        <video
          ref="localVideo"
          class="video-window__local-video"
          data-local-camera
          autoplay
          muted
          playsinline
          aria-label="医生摄像头画面"
        ></video>
        <div class="video-window__camera-status" data-camera-status>{{ cameraStatusText }}</div>
        <div class="video-window__pip-off" :aria-hidden="String(cameraOn)">摄像头已关闭</div>
      </div>
    </div>

    <div class="video-toolbar" role="toolbar" aria-label="视频通话控制">
      <button
        type="button"
        :class="['video-toolbar__btn', { 'is-off': !cameraOn }]"
        :aria-pressed="String(cameraOn)"
        :title="cameraOn ? '关闭摄像头' : '开启摄像头'"
        :aria-label="cameraOn ? '关闭摄像头' : '开启摄像头'"
        @click="$emit('toggle-camera')"
      >
        <VideoMediaIcon type="camera" :enabled="cameraOn" />
      </button>
      <button
        type="button"
        :class="['video-toolbar__btn', { 'is-off': !micOn }]"
        :aria-pressed="String(micOn)"
        :title="micOn ? '关闭麦克风' : '开启麦克风'"
        :aria-label="micOn ? '关闭麦克风' : '开启麦克风'"
        @click="$emit('toggle-microphone')"
      >
        <VideoMediaIcon type="microphone" :enabled="micOn" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, h, ref } from 'vue'
import { assetUrl } from '../../utils/assetUrl.js'

defineOptions({
  name: 'VideoCallWindow'
})

defineEmits(['toggle-camera', 'toggle-microphone'])

const props = defineProps({
  cameraOn: {
    type: Boolean,
    default: true
  },
  micOn: {
    type: Boolean,
    default: true
  },
  cameraLoading: {
    type: Boolean,
    default: false
  },
  cameraReady: {
    type: Boolean,
    default: false
  },
  cameraError: {
    type: Boolean,
    default: false
  },
  cameraStatusText: {
    type: String,
    default: '正在连接摄像头'
  },
  patientImage: {
    type: String,
    default: 'assets/video-main.png'
  },
  patientAlt: {
    type: String,
    default: '患者视频画面'
  }
})

const localVideo = ref(null)
const patientImageUrl = computed(() => assetUrl(props.patientImage))

defineExpose({
  localVideo
})

function VideoMediaIcon({ type, enabled }) {
  if (type === 'camera') {
    const children = enabled
      ? [
          h('path', {
            d: 'M4 7h4l2-2h4l2 2h4a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z',
            stroke: 'currentColor',
            'stroke-width': '1.6',
            'stroke-linejoin': 'round'
          }),
          h('circle', {
            cx: '12',
            cy: '13',
            r: '3.2',
            stroke: 'currentColor',
            'stroke-width': '1.6'
          })
        ]
      : [
          h('path', {
            d: 'M4 7h4l2-2h4l2 2h4a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z',
            stroke: 'currentColor',
            'stroke-width': '1.6',
            'stroke-linejoin': 'round'
          }),
          h('path', {
            d: 'm3 3 18 18',
            stroke: 'currentColor',
            'stroke-width': '1.6',
            'stroke-linecap': 'round'
          })
        ]
    return h('svg', { class: 'video-control-icon', viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' }, children)
  }

  const children = enabled
    ? [
        h('path', {
          d: 'M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z',
          stroke: 'currentColor',
          'stroke-width': '1.6'
        }),
        h('path', {
          d: 'M6 11v1a6 6 0 0 0 12 0v-1',
          stroke: 'currentColor',
          'stroke-width': '1.6',
          'stroke-linecap': 'round'
        }),
        h('path', {
          d: 'M12 18v3',
          stroke: 'currentColor',
          'stroke-width': '1.6',
          'stroke-linecap': 'round'
        })
      ]
    : [
        h('path', {
          d: 'M6 11v1a6 6 0 0 0 9.2 5.1',
          stroke: 'currentColor',
          'stroke-width': '1.6',
          'stroke-linecap': 'round'
        }),
        h('path', {
          d: 'M12 18v3',
          stroke: 'currentColor',
          'stroke-width': '1.6',
          'stroke-linecap': 'round'
        }),
        h('path', {
          d: 'm4 4 16 16',
          stroke: 'currentColor',
          'stroke-width': '1.6',
          'stroke-linecap': 'round'
        })
      ]
  return h('svg', { class: 'video-control-icon', viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' }, children)
}
</script>

<style>
.video-window {
  position: relative;
  width: calc(100% - 24px);
  aspect-ratio: 8 / 3;
  height: auto;
  margin: 12px 12px 0;
  flex: 0 0 auto;
  overflow: hidden;
  background: #d8dde1;
}

.video-window__stage {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  width: 100%;
  height: 100%;
}

.video-window__pane {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: #bec5cd;
}

.video-window__pane + .video-window__pane {
  border-left: 1px solid rgba(255, 255, 255, 0.64);
}

.video-toolbar {
  position: absolute;
  bottom: 14px;
  left: 50%;
  z-index: 3;
  display: flex;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 28px;
  background: rgba(16, 24, 32, 0.5);
  transform: translateX(-50%);
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
  pointer-events: auto;
}

.video-window[data-video-controls]:hover .video-toolbar,
.video-window[data-video-controls]:focus-within .video-toolbar,
.video-window[data-video-controls].is-media-off .video-toolbar {
  background: rgba(16, 24, 32, 0.82);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
  transform: translateX(-50%) translateY(-2px);
}

.video-toolbar__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;
}

.video-toolbar__btn:hover,
.video-toolbar__btn:focus-visible {
  background: rgba(255, 255, 255, 0.22);
  outline: none;
  transform: scale(1.05);
}

.video-toolbar__btn.is-off {
  background: rgba(120, 32, 32, 0.55);
  color: #ffb4b4;
}

.video-toolbar__btn.is-off:hover,
.video-toolbar__btn.is-off:focus-visible {
  background: rgba(140, 40, 40, 0.72);
}

.video-control-icon {
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
}

.video-window__pip--local {
  z-index: 1;
}

.video-window__pip-off {
  position: absolute;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: #5a6572;
  color: #ffffff;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
}

.video-window__pip.is-camera-off .video-window__pip-off {
  display: flex;
}

.video-window__local-video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1);
}

.video-window__pip.is-camera-loading .video-window__local-video,
.video-window__pip.is-camera-error .video-window__local-video,
.video-window__pip.is-camera-off .video-window__local-video {
  visibility: hidden;
}

.video-window__camera-status {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: #5a6572;
  color: #ffffff;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
}

.video-window__pip.is-camera-ready .video-window__camera-status,
.video-window__pip.is-camera-off .video-window__camera-status {
  display: none;
}

.video-window__main {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.video-window__pip {
  position: relative;
  width: auto;
  height: auto;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: #bec5cd;
  box-shadow: none;
}

.video-window__pip img {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  object-fit: cover;
  object-position: center top;
}
</style>
