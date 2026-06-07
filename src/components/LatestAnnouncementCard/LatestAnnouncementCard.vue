<template>
  <section :class="['card notice-card', { 'notice-card--unread': announcement?.unread }]" :aria-label="ariaLabel">
    <div v-if="announcement" class="notice-card__inner">
      <div class="notice-card__head">
        <div class="notice-card__title-row">
          <h2 class="card__title">{{ title }}</h2>
          <span class="notice-card__date">{{ announcement.date }}</span>
        </div>
        <div class="divider"></div>
      </div>
      <article class="announcement">
        <div class="announcement__top">
          <div class="announcement__title-row">
            <h3 class="announcement__title">{{ announcement.title }}</h3>
            <span v-if="announcement.unread" class="announcement__unread-dot" aria-label="有未读公告"></span>
          </div>
          <div class="announcement__body">
            {{ summary }}
            <button class="announcement__detail-trigger" type="button" @click="$emit('detail', announcement)">……展开详情</button>
          </div>
        </div>
        <p class="announcement__footer">{{ announcement.publisher }}</p>
      </article>
      <button class="jh-btn jh-btn--block-outline announcement-list-trigger" type="button" @click="$emit('history')">
        {{ historyText }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'LatestAnnouncementCard'
})

const props = defineProps({
  announcement: {
    type: Object,
    default: null
  },
  title: {
    type: String,
    default: '最新公告'
  },
  historyText: {
    type: String,
    default: '查看历史公告'
  },
  ariaLabel: {
    type: String,
    default: '最新公告'
  }
})

defineEmits(['detail', 'history'])

const summary = computed(() => props.announcement?.content?.split('\n').slice(0, 2).join('\n') || '')
</script>
