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
    default: () => ['10:00-11:00', '11:00-12:00', '12:00-13:00', '14:00-15:00', '15:00-16:00', '16:00-17:00']
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
      { row: 1, col: 6, span: 1, tone: 'cyan', title: '兜底科室报班', time: '07:00-08:00' },
      { row: 2, col: 2, span: 3, tone: 'blue', title: '线下药店续方服务', time: '10:00-13:00' },
      { row: 2, col: 5, span: 1, tone: 'amber', title: '自由报班', time: '14:00-15:00' },
      { row: 2, col: 6, span: 1, tone: 'cyan', title: '固定值班', time: '07:00-08:00' }
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
  min-height: 520px;
  padding: 36px 38px;
}

.quick-entry-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
}

.quick-entry-card__edit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 16px;
  border: 1px solid #e5e8eb;
  border-radius: 999px;
  background: #ffffff;
  color: var(--jh-text-secondary);
  cursor: pointer;
  font-size: 14px;
  line-height: 22px;
}

.quick-entry-card__edit-icon {
  position: relative;
  width: 14px;
  height: 14px;
}

.quick-entry-card__edit-icon::before,
.quick-entry-card__edit-icon::after {
  position: absolute;
  left: 2px;
  width: 10px;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
  content: "";
}

.quick-entry-card__edit-icon::before {
  top: 4px;
  transform: rotate(-45deg);
}

.quick-entry-card__edit-icon::after {
  top: 9px;
  transform: rotate(45deg);
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.quick-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 208px;
  padding: 24px;
  border: 1px solid #e5e8eb;
  border-radius: 6px;
  background: linear-gradient(270deg, #fcfcfc 0%, #f8f8f9 100%);
  cursor: pointer;
  text-align: center;
}

.quick-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: #ffffff;
}

.quick-icon {
  width: 30px;
  height: 30px;
}

.quick-icon--schedule,
.quick-icon--clock {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.quick-icon__base,
.quick-icon__mark,
.quick-icon__hand {
  position: absolute;
  display: block;
}

.quick-card__title {
  color: var(--jh-text-primary);
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}

.quick-card__desc {
  color: var(--jh-text-secondary);
  font-size: 14px;
  line-height: 22px;
}

.quick-card__delete,
.quick-card__drag {
  position: absolute;
  top: 10px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #ffffff;
  cursor: pointer;
}

.quick-card__delete {
  left: 10px;
  color: #d92d20;
}

.quick-card__drag {
  right: 10px;
  color: #99a1af;
}

.quick-card__drag::before {
  content: "⋮⋮";
  font-size: 13px;
  letter-spacing: -2px;
}

.quick-card__delete-icon {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
}

.quick-entry-card:not(.is-editing) .quick-card__delete,
.quick-entry-card:not(.is-editing) .quick-card__drag {
  display: none;
}

.quick-card__attention-dot {
  position: absolute;
  top: 16px;
  right: 18px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #f53f3f;
  box-shadow: 0 0 0 4px rgba(245, 63, 63, 0.12);
}

.quick-entry-card.is-schedule-open .quick-entry-card__header,
.quick-entry-card.is-schedule-open .quick-grid {
  display: none;
}

.schedule-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 100%;
}

.schedule-panel[hidden] {
  display: none;
}

.schedule-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.schedule-panel__title {
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
}

.schedule-panel__title strong {
  color: var(--jh-text-primary);
  font-size: 18px;
  line-height: 26px;
}

.schedule-panel__title span,
.schedule-panel__detail,
.schedule-panel__back {
  color: var(--jh-text-secondary);
  font-size: 14px;
  line-height: 22px;
}

.schedule-panel__actions {
  display: inline-flex;
  gap: 12px;
}

.schedule-panel__detail,
.schedule-panel__back,
.schedule-panel__arrow,
.schedule-panel__tab {
  border: 0;
  background: transparent;
  cursor: pointer;
}

.schedule-panel__tabs {
  display: grid;
  grid-template-columns: 32px repeat(6, minmax(0, 1fr)) 32px;
  gap: 8px;
}

.schedule-panel__tab {
  height: 32px;
  border-radius: 4px;
  background: #f8f8f9;
  color: var(--jh-text-secondary);
}

.schedule-panel__tab.is-active {
  background: #ebf3ff;
  color: var(--jh-blue);
}

.schedule-board {
  display: grid;
  grid-template-columns: 72px repeat(6, minmax(80px, 1fr));
  grid-template-rows: repeat(3, 64px);
  gap: 8px;
}

.schedule-board__date,
.schedule-event {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  border-radius: 6px;
}

.schedule-board__date {
  align-items: center;
  background: #f8f8f9;
  color: var(--jh-text-secondary);
  font-size: 12px;
}

.schedule-event {
  gap: 4px;
  padding: 8px 10px;
  background: #ebf3ff;
  color: #1e2939;
}

.schedule-event--cyan {
  background: #f1fbff;
}

.schedule-event--amber {
  background: #fff8ed;
}

.schedule-event--red {
  background: #fff7f7;
}

.schedule-event strong,
.schedule-event span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
