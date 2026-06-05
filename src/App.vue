<template>
  <div class="docs-shell">
    <aside class="docs-sidebar" aria-label="组件导航">
      <a class="docs-brand" href="#overview" aria-label="JiaHong UI 首页">
        <img :src="assetUrl('assets/figma-home/logo.png')" alt="" />
        <span>
          <strong>JiaHong UI</strong>
          <small>嘉虹医疗组件库</small>
        </span>
      </a>

      <nav class="docs-nav">
        <a v-for="item in navItems" :key="item.id" :href="`#${item.id}`">
          <span>{{ item.name }}</span>
          <small>{{ item.count }}</small>
        </a>
      </nav>

      <div class="docs-sidebar__meta">
        <span>Package</span>
        <code>@jiahong/ui</code>
      </div>
    </aside>

    <main class="docs-main">
      <header id="overview" class="docs-topbar">
        <div>
          <h1>JiaHong UI Components</h1>
          <p>统一沉淀嘉虹医疗多端可复用的基础组件、样式变量、图标与图片资产。</p>
        </div>
        <div class="docs-toolbar">
          <label class="docs-search">
            <span aria-hidden="true">⌕</span>
            <input v-model="query" type="search" placeholder="搜索组件 / token / utility" />
          </label>
          <span class="docs-version">v0.1.0</span>
        </div>
      </header>

      <section id="foundations" class="docs-section">
        <div class="docs-section__head">
          <h2>Foundations</h2>
          <p>Design tokens are exported through <code>@jiahong/ui/styles.css</code>.</p>
        </div>
        <div class="token-grid">
          <article v-for="token in tokens" :key="token.name" class="token-card">
            <span class="token-card__swatch" :style="{ background: token.value }"></span>
            <div>
              <strong>{{ token.name }}</strong>
              <code>{{ token.value }}</code>
            </div>
          </article>
        </div>
      </section>

      <section id="components" class="docs-section">
        <div class="docs-section__head">
          <h2>Components</h2>
          <p>Vue components and CSS primitives for product screens.</p>
        </div>
        <div class="component-grid">
          <article v-for="item in filteredComponents" :key="item.name" class="component-card">
            <header>
              <div>
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
              </div>
              <code>{{ item.importName }}</code>
            </header>
            <div class="component-card__preview" :class="item.previewClass">
              <component :is="item.preview" />
            </div>
            <footer>
              <span v-for="api in item.api" :key="api">{{ api }}</span>
            </footer>
          </article>
        </div>
      </section>

      <section id="styles" class="docs-section">
        <div class="docs-section__head">
          <h2>CSS Primitives</h2>
          <p>迁移自医生端、已过滤业务命名的通用样式类。</p>
        </div>
        <div class="primitive-board">
          <div class="primitive-panel">
            <h3>Buttons</h3>
            <div class="primitive-row">
              <button class="jh-btn jh-btn--md jh-btn--primary" type="button">主要按钮</button>
              <button class="jh-btn jh-btn--md jh-btn--outline-secondary" type="button">次要按钮</button>
              <button class="jh-btn jh-btn--md jh-btn--danger" type="button">危险按钮</button>
              <button class="jh-btn jh-btn--md jh-btn--text" type="button">文字按钮</button>
            </div>
          </div>

          <div class="primitive-panel">
            <h3>Controls</h3>
            <div class="primitive-row">
              <button class="jh-switch is-on" type="button" aria-label="开启" aria-pressed="true"></button>
              <button class="jh-switch" type="button" aria-label="关闭" aria-pressed="false"></button>
              <span class="jh-checkbox is-selected">
                <span class="jh-checkbox__icon" aria-hidden="true">
                  <img class="jh-checkbox__mark" :src="assetUrl('assets/figma-home/checkmark.svg')" alt="" />
                </span>
                <span>已选择</span>
              </span>
            </div>
          </div>

          <div class="primitive-panel primitive-panel--wide">
            <h3>Inputs</h3>
            <div class="primitive-row primitive-row--stack">
              <input class="jh-input-field jh-input-field--lg" value="武汉市好药师大药房" aria-label="示例输入" />
              <span class="jh-search-field">
                <span class="jh-search-field__icon" aria-hidden="true">
                  <img :src="assetUrl('assets/search-icon.png')" alt="" />
                </span>
                <input type="text" placeholder="请输入关键字做模糊查询" aria-label="搜索示例" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="assets" class="docs-section">
        <div class="docs-section__head">
          <h2>Assets</h2>
          <p>通过 <code>assetUrl(path)</code> 统一读取共享资产。</p>
        </div>
        <div class="asset-grid">
          <article v-for="asset in assets" :key="asset.name" class="asset-card">
            <img :src="assetUrl(asset.path)" :alt="asset.name" />
            <strong>{{ asset.name }}</strong>
            <code>{{ asset.path }}</code>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, h, ref } from 'vue'
import {
  Avatar,
  Button,
  Card,
  DurationChip,
  EmptyState,
  FollowUpVoucher,
  ReadTag,
  StatusBadge,
  TypeIcon,
  assetUrl
} from './index.js'

const query = ref('')

const navItems = [
  { id: 'foundations', name: 'Foundations', count: 'Tokens' },
  { id: 'components', name: 'Components', count: '9' },
  { id: 'styles', name: 'CSS Primitives', count: '12' },
  { id: 'assets', name: 'Assets', count: '44' }
]

const tokens = [
  { name: '--jh-color-primary', value: '#1677ff' },
  { name: '--jh-color-success', value: '#2ba471' },
  { name: '--jh-color-warning', value: '#e37318' },
  { name: '--jh-color-danger', value: '#cb2c2c' },
  { name: '--jh-color-bg-page', value: '#f4f5f6' },
  { name: '--jh-color-bg-surface', value: '#ffffff' },
  { name: '--jh-color-border', value: '#e5e8eb' },
  { name: '--jh-shadow-md', value: '0 6px 16px -8px rgba(16, 42, 67, .08)' }
]

const voucherImages = [
  { title: '图片凭证1', image: 'assets/consult-materials/allergic-rhinitis.png' },
  { title: '图片凭证2', image: 'assets/consult-materials/pediatric-fever.png' },
  { title: '图片凭证3', image: 'assets/consult-materials/sore-throat.png' }
]
const voucherVoices = [
  { title: '语音凭证1', duration: 8 },
  { title: '语音凭证2', duration: 7 }
]

const componentItems = [
  {
    name: 'Button',
    importName: 'Button',
    description: '基础操作按钮，支持语义色和尺寸。',
    api: ['tone', 'size', 'disabled', 'block'],
    preview: () =>
      h('div', { class: 'preview-row' }, [
        h(Button, { tone: 'primary' }, () => '确认'),
        h(Button, { tone: 'secondary' }, () => '取消'),
        h(Button, { tone: 'danger' }, () => '删除')
      ])
  },
  {
    name: 'StatusBadge',
    importName: 'StatusBadge',
    description: '通用状态标签，业务项目自行传入 label。',
    api: ['status', 'tone', 'label', 'dot'],
    preview: () =>
      h('div', { class: 'preview-row' }, [
        h(StatusBadge, { status: 'online' }),
        h(StatusBadge, { status: 'busy' }),
        h(StatusBadge, { status: 'offline' }),
        h(StatusBadge, { tone: 'danger', label: '异常' })
      ])
  },
  {
    name: 'ReadTag',
    importName: 'ReadTag',
    description: '消息或记录的已读/未读状态。',
    api: ['status', 'text'],
    preview: () => h('div', { class: 'preview-row' }, [h(ReadTag, { status: 'unread' }), h(ReadTag, { status: 'read' }), h(ReadTag, { status: 'read', text: '已归档' })])
  },
  {
    name: 'DurationChip',
    importName: 'DurationChip',
    description: '展示持续时长，内置 warning/danger tone。',
    api: ['seconds', 'variant', 'label'],
    preview: () => h('div', { class: 'preview-stack' }, [h(DurationChip, { seconds: 120 }), h(DurationChip, { seconds: 620, label: '问诊持续时长：' })])
  },
  {
    name: 'TypeIcon',
    importName: 'TypeIcon',
    description: '通用类型图标，可覆盖 icons 映射。',
    api: ['type', 'icons'],
    preview: () =>
      h('div', { class: 'message-list-demo' }, [
        messageItem('video', '视频服务', '患者等待接入', 1),
        messageItem('text', '图文服务', '患者补充了症状描述', 2),
        messageItem('consult', '在线咨询', '处理意见待填写', 0)
      ])
  },
  {
    name: 'Avatar',
    importName: 'Avatar',
    description: '用户头像，支持图片或姓名首字。',
    api: ['src', 'name', 'size'],
    preview: () =>
      h('div', { class: 'preview-row' }, [
        h(Avatar, { src: assetUrl('assets/figma-home/avatar-source.png'), name: '嘉虹' }),
        h(Avatar, { name: '陈医生' }),
        h(Avatar, { name: '药师', size: 'lg' })
      ])
  },
  {
    name: 'Card',
    importName: 'Card',
    description: '基础内容容器，保留轻量边框和阴影。',
    api: ['title', 'padding'],
    preview: () => h(Card, { title: '服务概览' }, () => h('p', { class: 'card-demo-copy' }, '用于承载跨端通用内容，不绑定业务数据。'))
  },
  {
    name: 'EmptyState',
    importName: 'EmptyState',
    description: '空状态提示，支持共享插图。',
    api: ['image', 'title', 'description'],
    previewClass: 'component-card__preview--compact',
    preview: () => h(EmptyState, { image: assetUrl('assets/room-empty.svg'), title: '暂无记录', description: '稍后有新内容时会展示在这里' })
  },
  {
    name: 'FollowUpVoucher',
    importName: 'FollowUpVoucher',
    description: '通用凭证展示，不接收业务 record。',
    api: ['variant', 'images', 'voices', 'title'],
    previewClass: 'component-card__preview--voucher',
    preview: () => h(FollowUpVoucher, { title: '复诊凭证', variant: 'mixed', images: voucherImages, voices: voucherVoices })
  }
]

const assets = [
  { name: 'Logo', path: 'assets/figma-home/logo.png' },
  { name: 'Search', path: 'assets/search-icon.png' },
  { name: 'Empty', path: 'assets/room-empty.svg' },
  { name: 'Video', path: 'assets/figma-room/video-consult.svg' },
  { name: 'Text', path: 'assets/figma-room/text-consult.svg' },
  { name: 'Consult', path: 'assets/figma-room/consult.svg' }
]

const filteredComponents = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return componentItems
  return componentItems.filter((item) => `${item.name} ${item.description} ${item.api.join(' ')}`.toLowerCase().includes(keyword))
})

function messageItem(type, title, preview, badge) {
  return h('button', { class: 'message-item', type: 'button' }, [
    h('span', { class: 'message-item__stripe', 'aria-hidden': 'true' }),
    h(TypeIcon, { type }),
    h('span', { class: 'message-item__body' }, [
      h('span', { class: 'message-item__title' }, title),
      h('span', { class: 'message-item__preview' }, preview)
    ]),
    badge ? h('span', { class: 'message-item__badge' }, badge) : null
  ])
}
</script>
