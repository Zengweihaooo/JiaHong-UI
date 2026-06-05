<template>
  <section :class="['card quick-entry-card', { 'is-editing': editing, 'is-schedule-open': scheduleOpen }]" :aria-label="ariaLabel">
    <div class="quick-entry-card__header">
      <h2 class="card__title">{{ title }}</h2>
      <button class="quick-entry-card__edit" type="button" :aria-label="editAriaLabel" :aria-pressed="editing" @click="toggleEditing">
        <span class="quick-entry-card__edit-icon" aria-hidden="true"></span>
        <span class="quick-entry-card__edit-text">{{ editing ? doneText : editText }}</span>
      </button>
    </div>
    <div class="quick-grid">
      <div
        v-for="(action, index) in actions"
        :key="`${index}-${action.title || action.desc}`"
        :class="['quick-card', action.isAdd ? 'quick-card--add' : 'quick-card--custom']"
        :data-action="action.title || action.desc"
        :data-quick-feature="featureOf(action)"
        :data-attention="needsAttention(action) ? attentionValue : undefined"
        role="button"
        tabindex="0"
        @click="handleAction(action, index, $event)"
        @keydown.enter.prevent="handleAction(action, index, $event)"
        @keydown.space.prevent="handleAction(action, index, $event)"
      >
        <button v-if="!action.isAdd" class="quick-card__delete" type="button" :aria-label="`${removeLabelPrefix}${action.title}`" @click.stop="removeAction(action, index)">
          <svg class="quick-card__delete-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M4 4L12 12M12 4L4 12" />
          </svg>
        </button>
        <button v-if="!action.isAdd" class="quick-card__drag" type="button" :aria-label="`${dragLabelPrefix}${action.title}`" draggable="true"></button>
        <span v-if="needsAttention(action)" class="quick-card__attention-dot" :aria-label="attentionLabel"></span>
        <span class="quick-card__body">
          <span class="icon-box">
            <span v-if="action.icon === 'quickCalendar'" class="quick-icon quick-icon--schedule" aria-hidden="true">
              <img class="quick-icon__base" :src="assetUrl('assets/figma-home/quick-schedule-box.svg')" alt="" />
              <img class="quick-icon__mark" :src="assetUrl('assets/figma-home/quick-schedule-mark.svg')" alt="" />
            </span>
            <span v-else-if="action.icon === 'clock'" class="quick-icon quick-icon--clock" aria-hidden="true">
              <img class="quick-icon__base" :src="assetUrl('assets/figma-home/quick-clock-circle.svg')" alt="" />
              <img class="quick-icon__hand" :src="assetUrl('assets/figma-home/quick-clock-hand.svg')" alt="" />
            </span>
            <img v-else class="quick-icon" :class="`quick-icon--${action.icon || 'document'}`" :src="quickIcon(action.icon)" alt="" aria-hidden="true" />
          </span>
          <span v-if="action.title" class="quick-card__title">{{ action.title }}</span>
          <span class="quick-card__desc">{{ action.desc }}</span>
        </span>
      </div>
    </div>
    <section class="schedule-panel" :aria-label="scheduleTitle" :hidden="!scheduleOpen">
      <header class="schedule-panel__header">
        <span class="schedule-panel__title">
          <strong>{{ scheduleTitle }}</strong>
          <span>{{ scheduleUpdatedText }}</span>
        </span>
        <span class="schedule-panel__actions">
          <button class="schedule-panel__detail" type="button" @click="$emit('schedule-detail')">{{ scheduleDetailText }}</button>
          <button class="schedule-panel__back" type="button" @click="closeSchedulePanel">{{ scheduleBackText }}</button>
        </span>
      </header>
      <nav class="schedule-panel__tabs" :aria-label="scheduleTabsLabel">
        <button class="schedule-panel__arrow" type="button" aria-label="上一个时间段">‹</button>
        <button
          v-for="(slot, index) in scheduleSlots"
          :key="slot"
          :class="['schedule-panel__tab', { 'is-active': index === activeScheduleSlotIndex }]"
          type="button"
        >
          {{ slot }}
        </button>
        <button class="schedule-panel__arrow" type="button" aria-label="下一个时间段">›</button>
      </nav>
      <div class="schedule-board">
        <div v-for="(row, index) in scheduleRows" :key="row.label" class="schedule-board__date" :style="{ gridRow: String(index + 1) }">
          <span>{{ row.label }}</span>
          <span>{{ row.sub }}</span>
        </div>
        <article
          v-for="item in scheduleItems"
          :key="`${item.row}-${item.col}-${item.title}`"
          :class="['schedule-event', `schedule-event--${item.tone}`, { 'is-active': item.active }]"
          :style="{ gridRow: String(item.row), gridColumn: `${item.col} / span ${item.span}` }"
        >
          <strong>{{ item.title }}</strong>
          <span>{{ item.time }}</span>
          <em v-if="item.active" aria-hidden="true">{{ activeScheduleText }}</em>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { assetUrl } from '../../utils/assetUrl.js'

defineOptions({
  name: 'QuickActionsPanel'
})

const props = defineProps({
  title: {
    type: String,
    default: '高频操作入口'
  },
  actions: {
    type: Array,
    default: () => []
  },
  featureMap: {
    type: Object,
    default: () => ({})
  },
  iconMap: {
    type: Object,
    default: () => ({})
  },
  attentionFeature: {
    type: String,
    default: 'schedule'
  },
  attentionValue: {
    type: String,
    default: 'unpunched-schedule'
  },
  attentionLabel: {
    type: String,
    default: '存在未打卡排班'
  },
  editText: {
    type: String,
    default: '编辑'
  },
  doneText: {
    type: String,
    default: '完成'
  },
  editAriaLabel: {
    type: String,
    default: '编辑高频操作入口'
  },
  removeLabelPrefix: {
    type: String,
    default: '删除快捷入口：'
  },
  dragLabelPrefix: {
    type: String,
    default: '拖动排序：'
  },
  ariaLabel: {
    type: String,
    default: '高频操作入口'
  },
  scheduleTitle: {
    type: String,
    default: '近期排班'
  },
  scheduleUpdatedText: {
    type: String,
    default: '11分钟前已变更'
  },
  scheduleDetailText: {
    type: String,
    default: '查看详情'
  },
  scheduleBackText: {
    type: String,
    default: '返回入口'
  },
  scheduleTabsLabel: {
    type: String,
    default: '排班时间段'
  },
  scheduleSlots: {
    type: Array,
    default: () => ['10:00–11:00', '11:00–12:00', '12:00–13:00', '14:00–15:00', '15:00–16:00', '16:00–17:00']
  },
  activeScheduleSlotIndex: {
    type: Number,
    default: 1
  },
  scheduleRows: {
    type: Array,
    default: () => [
      { label: '5-04', sub: '今日' },
      { label: '5-05', sub: '周一' },
      { label: '5-06', sub: '周二' }
    ]
  },
  scheduleItems: {
    type: Array,
    default: () => [
      { row: 1, col: 2, span: 3, tone: 'blue', title: '线下药店续方服务', time: '10:00-13:00', active: true },
      { row: 1, col: 6, span: 1, tone: 'cyan', title: '妙手阿里-兜底科室报班', time: '07:00-08:00' },
      { row: 2, col: 2, span: 3, tone: 'blue', title: '线下药店续方服务', time: '10:00-13:00' },
      { row: 2, col: 5, span: 1, tone: 'amber', title: '九州通美团-兜底科室报班', time: '14:00-15:00' },
      { row: 2, col: 6, span: 1, tone: 'cyan', title: '妙手阿里-兜底科室报班', time: '07:00-08:00' },
      { row: 3, col: 2, span: 1, tone: 'red', title: '拼多多-自由报班', time: '10:00-11:00' },
      { row: 3, col: 4, span: 1, tone: 'cyan', title: '九州通阿里-固定值班', time: '12:00-13:00' },
      { row: 3, col: 5, span: 2, tone: 'amber', title: '九州通美团-自由报班', time: '14:00-16:00' }
    ]
  },
  activeScheduleText: {
    type: String,
    default: '进行中'
  }
})

const emit = defineEmits(['add', 'edit', 'remove', 'select', 'schedule-open', 'schedule-detail'])

const editing = ref(false)
const scheduleOpen = ref(false)

const defaultIconMap = {
  document: 'assets/figma-home/quick-doc.svg',
  plus: 'assets/figma-home/quick-plus.svg',
  user: 'assets/figma-home/user.svg',
  shield: 'assets/figma-home/pocket.svg',
  clipboard: 'assets/figma-home/clipboard.svg',
  briefcase: 'assets/figma-home/briefcase.svg',
  calendar: 'assets/figma-home/calendar.svg'
}

function quickIcon(name) {
  return assetUrl(props.iconMap[name] || defaultIconMap[name] || defaultIconMap.document)
}

function featureOf(action) {
  return action.feature || props.featureMap[action.icon] || ''
}

function needsAttention(action) {
  return !action.isAdd && featureOf(action) === props.attentionFeature
}

function toggleEditing() {
  editing.value = !editing.value
}

function openSchedulePanel(action, index) {
  editing.value = false
  scheduleOpen.value = true
  emit('schedule-open', { action, index })
}

function closeSchedulePanel(event) {
  event?.preventDefault()
  event?.stopPropagation()
  scheduleOpen.value = false
}

function handleAction(action, index, event) {
  if (event?.target?.closest?.('.quick-card__delete, .quick-card__drag')) return
  if (action.isAdd) {
    emit('add', { action, index })
    return
  }
  if (editing.value) {
    emit('edit', { action, index })
    return
  }
  const feature = featureOf(action)
  if (feature === props.attentionFeature) {
    openSchedulePanel(action, index)
    return
  }
  emit('select', { action, index, feature })
}

function removeAction(action, index) {
  if (!editing.value) return
  emit('remove', { action, index })
}
</script>

<style>
.quick-entry-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 476px;
  padding: 24px 32px;
  box-shadow: var(--jh-shadow-soft);
}

.quick-entry-card.is-schedule-open {
  gap: 18px;
  padding: 24px 32px;
}

.quick-entry-card.is-schedule-open .quick-entry-card__header,
.quick-entry-card.is-schedule-open .quick-grid {
  display: none;
}

.quick-entry-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.quick-entry-card__edit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 0 0 auto;
  min-width: 72px;
  height: 30px;
  padding: 0 12px;
  border: 1px solid var(--jh-line);
  border-radius: 999px;
  background: #ffffff;
  color: var(--jh-text-tertiary);
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.quick-entry-card__edit:hover,
.quick-entry-card__edit[aria-pressed="true"] {
  border-color: #cfe3ff;
  background: #ebf3ff;
  color: var(--jh-blue);
  box-shadow: 0 6px 14px -10px rgba(16, 42, 67, 0.3);
}

.quick-entry-card__edit-icon {
  position: relative;
  display: block;
  width: 12px;
  height: 12px;
}

.quick-entry-card__edit-icon::before {
  position: absolute;
  left: 2px;
  top: 5px;
  width: 8px;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
  transform: rotate(-45deg);
  content: "";
}

.quick-entry-card__edit-icon::after {
  position: absolute;
  right: 1px;
  bottom: 1px;
  width: 4px;
  height: 4px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  content: "";
}

.quick-entry-card__edit-text {
  white-space: nowrap;
}

.quick-grid {
  display: grid;
  align-items: stretch;
  justify-content: center;
  gap: 16px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: auto;
  width: 100%;
  min-width: 0;
  height: auto;
}

.quick-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
  min-height: 168px;
  height: auto;
  padding: 14px 10px;
  overflow: visible;
  border: 1px solid var(--jh-line);
  border-radius: 6px;
  background: linear-gradient(270deg, #fcfcfc 0%, var(--jh-panel) 100%);
  color: var(--jh-text-secondary);
  cursor: pointer;
  transform-origin: center;
  transition:
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease,
    opacity 180ms ease,
    transform 180ms ease;
  will-change: transform;
}

.quick-card:hover {
  transform: translateY(-2px);
  border-color: #cfe3ff;
  box-shadow: 0 8px 20px -14px rgba(0, 110, 249, 0.55);
}

.quick-card__attention-dot {
  position: absolute;
  right: 14px;
  top: 14px;
  z-index: 1;
  width: 9px;
  height: 9px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: #f53f3f;
  box-shadow: 0 0 0 2px rgba(245, 63, 63, 0.12);
}

.quick-card--add {
  border-style: dashed;
}

.quick-card__delete,
.quick-card__drag {
  position: absolute;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--jh-line);
  border-radius: 50%;
  background: #ffffff;
  color: var(--jh-text-tertiary);
  cursor: pointer;
  opacity: 1;
  pointer-events: auto;
  box-shadow: 0 6px 14px -12px rgba(16, 42, 67, 0.4);
  transform: translateY(0) scale(1);
  transition:
    opacity 180ms ease,
    visibility 180ms ease,
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 180ms ease,
    color 180ms ease,
    box-shadow 180ms ease;
  visibility: visible;
}

.quick-card__delete {
  top: 8px;
  right: 8px;
}

.quick-card__drag {
  top: 8px;
  left: 8px;
  cursor: grab;
  touch-action: none;
}

.quick-entry-card:not(.is-editing) .quick-card__delete,
.quick-entry-card:not(.is-editing) .quick-card__drag {
  opacity: 0;
  pointer-events: none;
  transform: translateY(-4px) scale(0.88);
  visibility: hidden;
}

.quick-card__delete:hover {
  border-color: #ffd0d0;
  color: #d92d20;
  box-shadow: 0 10px 18px -12px rgba(217, 45, 32, 0.45);
  transform: translateY(-1px) scale(1.06);
}

.quick-card__drag:hover {
  border-color: #cfe3ff;
  color: var(--jh-blue);
  box-shadow: 0 10px 18px -12px rgba(0, 110, 249, 0.45);
  transform: translateY(-1px) scale(1.06);
}

.quick-card__delete-icon {
  display: block;
  width: 14px;
  height: 14px;
  overflow: visible;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  shape-rendering: geometricPrecision;
}

.quick-card__drag::before {
  width: 13px;
  height: 10px;
  background:
    radial-gradient(circle, currentColor 1.5px, transparent 1.7px) 0 0 / 6px 5px;
  content: "";
}

.quick-entry-card.is-editing .quick-card--custom {
  border-color: #cfe3ff;
  background: #f8fbff;
  cursor: grab;
  box-shadow: 0 10px 24px -20px rgba(0, 110, 249, 0.45);
}

.quick-card.is-dragging {
  z-index: 3;
  opacity: 0.86;
  cursor: grabbing;
  transform: scale(1.025);
  box-shadow: 0 18px 30px -18px rgba(0, 110, 249, 0.48);
  transition:
    opacity 140ms ease,
    box-shadow 140ms ease,
    transform 140ms ease;
}

.quick-card.is-removing {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.9) translateY(8px);
}

.quick-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: visible;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border: 1px solid #e5e8eb;
  border-radius: 6px;
  background: #ffffff;
  color: var(--jh-blue);
}

.quick-card .icon-box {
  border-color: transparent;
  background: #ffffff;
}

.quick-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  overflow: visible;
}

.quick-icon img,
img.quick-icon {
  display: block;
  max-width: none;
}

.quick-icon--schedule {
  width: 23px;
  height: 24px;
}

.quick-icon--schedule .quick-icon__base {
  width: 23px;
  height: 24px;
}

.quick-icon--schedule .quick-icon__mark {
  position: absolute;
  left: 4px;
  top: -2px;
  width: 14px;
  height: 8px;
}

.quick-icon--document {
  width: 19px;
  height: 25px;
}

.quick-icon--clock {
  width: 28px;
  height: 27px;
}

.quick-icon--clock .quick-icon__base {
  width: 28px;
  height: 27px;
}

.quick-icon--clock .quick-icon__hand {
  position: absolute;
  left: 12px;
  top: 5px;
  width: 8px;
  height: 13px;
}

.quick-icon--plus {
  width: 21px;
  height: 21px;
}

.quick-card__title {
  margin: 0;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  color: var(--jh-text-primary);
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  text-align: center;
  word-break: break-word;
  overflow-wrap: anywhere;
  overflow: visible;
}

.quick-card__desc {
  margin: 0;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  min-height: 20px;
  color: var(--jh-text-secondary);
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  word-break: break-word;
  overflow-wrap: anywhere;
  overflow: visible;
}

.schedule-panel[hidden] {
  display: none;
}

.schedule-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-width: 0;
  height: 100%;
  color: var(--jh-text-primary);
}

.schedule-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 30px;
}

.schedule-panel__title {
  display: inline-flex;
  align-items: baseline;
  gap: 12px;
  min-width: 0;
}

.schedule-panel__title strong {
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  white-space: nowrap;
}

.schedule-panel__title span {
  color: #b5c0cc;
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
}

.schedule-panel__actions {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
}

.schedule-panel__detail,
.schedule-panel__back {
  padding: 0;
  border: 0;
  background: transparent;
  color: #7d8a99;
  cursor: pointer;
  font-size: 14px;
  line-height: 22px;
}

.schedule-panel__back {
  color: var(--jh-blue);
}

.schedule-panel__detail:hover,
.schedule-panel__back:hover,
.schedule-panel__detail:focus-visible,
.schedule-panel__back:focus-visible {
  color: var(--jh-blue);
  outline: none;
}

.schedule-panel__tabs {
  display: grid;
  align-items: center;
  grid-template-columns: 28px repeat(6, minmax(0, 1fr)) 28px;
  height: 56px;
  padding: 0 12px;
  border-radius: 6px;
  background: #f8fbff;
}

.schedule-panel__arrow,
.schedule-panel__tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 40px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #7d8a99;
  cursor: pointer;
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
}

.schedule-panel__arrow {
  font-size: 30px;
  line-height: 30px;
}

.schedule-panel__tab.is-active {
  position: relative;
  color: var(--jh-blue);
  font-weight: 700;
}

.schedule-panel__tab.is-active::after {
  position: absolute;
  right: 10px;
  bottom: 2px;
  left: 10px;
  height: 2px;
  background: var(--jh-blue);
  content: "";
}

.schedule-board {
  display: grid;
  grid-template-columns: 56px repeat(5, minmax(96px, 1fr));
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  flex: 1;
  min-height: 0;
}

.schedule-board__date {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  color: #7d8a99;
  font-size: 15px;
  line-height: 22px;
}

.schedule-event {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  min-height: 0;
  padding: 12px 12px 12px 14px;
  overflow: hidden;
  border-radius: 4px;
  background: #f5f9ff;
  color: var(--jh-text-primary);
  font-size: 14px;
  line-height: 22px;
}

.schedule-event::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 3px;
  background: var(--jh-blue);
  content: "";
}

.schedule-event strong {
  overflow: hidden;
  color: inherit;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.schedule-event span {
  overflow: hidden;
  color: #4c5f73;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.schedule-event em {
  position: absolute;
  right: 14px;
  bottom: 12px;
  color: rgba(125, 138, 153, 0.28);
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 1;
  transform: rotate(-22deg);
}

.schedule-event--blue {
  background: #eef5ff;
  color: #2768ff;
}

.schedule-event--cyan {
  background: #f1fbff;
}

.schedule-event--cyan::before {
  background: #1d9bf0;
}

.schedule-event--amber {
  background: #fffaf0;
}

.schedule-event--amber::before {
  background: #f59e0b;
}

.schedule-event--red {
  background: #fff7f7;
}

.schedule-event--red::before {
  background: #d92d20;
}
</style>
