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
        <div class="token-groups">
          <article v-for="group in filteredTokenGroups" :key="group.title" class="token-group">
            <header class="token-group__head">
              <div>
                <h3>{{ group.title }}</h3>
                <p>{{ group.description }}</p>
              </div>
              <span>{{ group.tokens.length }} tokens</span>
            </header>
            <div class="token-grid">
              <button
                v-for="token in group.tokens"
                :key="token.name"
                class="token-card"
                type="button"
                :aria-label="`复制 ${token.name}`"
                @click="copyToken(token)"
              >
                <span class="token-card__swatch" :style="{ background: token.value }"></span>
                <span class="token-card__body">
                  <strong>{{ token.name }}</strong>
                  <code>{{ token.value }}</code>
                  <small>{{ copiedToken === token.name ? '已复制 token 名称' : token.detail }}</small>
                </span>
                <span class="token-card__detail" role="tooltip">
                  <strong>Design usage</strong>
                  <span>{{ token.detail }}</span>
                  <code>{{ token.css }}</code>
                </span>
              </button>
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
            <div class="component-preview-shell">
              <div class="component-card__preview" :class="item.previewClass" :style="previewFrameStyle(item)">
                <div class="component-card__preview-scale">
                  <component :is="item.preview" />
                </div>
              </div>
              <button class="component-preview-trigger" type="button" :aria-label="`按原比例查看 ${item.name}`" @click="openComponentPreview(item)">
                <span>1:1</span>
              </button>
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

          <div class="primitive-panel primitive-panel--wide">
            <h3>Surfaces</h3>
            <div class="primitive-row primitive-row--surfaces">
              <div class="jh-surface primitive-surface-demo">
                <strong>.jh-surface</strong>
                <small>通用白底卡片、弹窗内容块。</small>
              </div>
              <div class="jh-panel primitive-surface-demo">
                <strong>.jh-panel</strong>
                <small>二级信息区、输入辅助背景。</small>
              </div>
              <div class="jh-dialog-surface primitive-surface-demo">
                <strong>.jh-dialog-surface</strong>
                <small>浮层、菜单、确认弹窗。</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="migration" class="docs-section">
        <div class="docs-section__head">
          <h2>Migration Map</h2>
          <p>医生端抽离边界：共享 UI 上移，业务工作台布局保留在业务仓库。</p>
        </div>
        <div class="migration-board">
          <article v-for="item in migrationItems" :key="item.title" class="migration-card">
            <header>
              <strong>{{ item.title }}</strong>
              <StatusBadge :tone="item.tone" :label="item.state" :dot="false" />
            </header>
            <p>{{ item.description }}</p>
            <code>{{ item.path }}</code>
          </article>
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

    <Teleport to="body">
      <div v-if="activePreview" class="component-preview-dialog" role="presentation" @click.self="closeComponentPreview">
        <section class="component-preview-dialog__panel" role="dialog" aria-modal="true" :aria-labelledby="`component-preview-title-${activePreview.name}`">
          <header class="component-preview-dialog__head">
            <div>
              <strong :id="`component-preview-title-${activePreview.name}`">{{ activePreview.name }}</strong>
              <span>{{ previewSizeLabel(activePreview) }}</span>
            </div>
            <button class="component-preview-dialog__close" type="button" aria-label="关闭原比例预览" @click="closeComponentPreview">×</button>
          </header>
          <div class="component-preview-dialog__viewport">
            <div class="component-preview-dialog__canvas" :class="activePreview.previewClass" :style="previewDialogStyle(activePreview)">
              <component :is="activePreview.preview" :key="`full-${activePreview.name}`" />
            </div>
          </div>
        </section>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  Avatar,
  Button,
  Card,
  ConsultEntryCard,
  ConsultInfoCard,
  DurationChip,
  EmptyState,
  FollowUpVoucher,
  MedicineRiskTip,
  QuickActionsPanel,
  ReadTag,
  RoomPendingWorkspace,
  ServiceStatusCard,
  StatusBadge,
  TypeIcon,
  VideoCallWindow,
  WaitingStatusCard,
  WorkspaceShell,
  WorkspaceSidebar,
  assetUrl
} from './index.js'

const query = ref('')
const copiedToken = ref('')
const activePreview = ref(null)

const defaultPreviewSize = {
  width: 320,
  height: 150,
  thumbnailScale: 1
}

const navItems = [
  { id: 'foundations', name: 'Foundations', count: '58' },
  { id: 'components', name: 'Components', count: '19' },
  { id: 'styles', name: 'CSS Primitives', count: '18' },
  { id: 'migration', name: 'Migration', count: 'Map' },
  { id: 'assets', name: 'Assets', count: '44' }
]

const tokenGroups = [
  {
    title: 'Brand and Semantic Color',
    description: '品牌、状态和风险色。业务端只传状态，不在页面内硬编码色值。',
    tokens: [
      token('--jh-color-primary', '#1677ff', '品牌主色，用于新组件和 docs。'),
      token('--jh-blue', '#006ef9', '医生端迁移兼容主蓝，用于旧页面视觉还原。'),
      token('--jh-blue-light', '#3b92ff', '主按钮渐变高光和 hover 边框。'),
      token('--jh-color-success', '#20b26b', '通用成功语义。'),
      token('--jh-green', '#2ba471', '在线/通过状态兼容色。'),
      token('--jh-color-warning', '#f59e0b', '等待、超时预警、通用警告。'),
      token('--jh-orange', '#f97316', '未读、提醒、补充提示。'),
      token('--jh-color-danger', '#e5484d', '危险操作、删除确认、错误状态。')
    ]
  },
  {
    title: 'Surface and Text',
    description: '页面背景、卡片、分割线和文字层级。',
    tokens: [
      token('--jh-bg', '#f4f5f6', '应用页面底色。'),
      token('--jh-card', '#ffffff', '卡片、弹窗、白底容器。'),
      token('--jh-panel', '#f8f8f9', '输入、二级面板、弱容器。'),
      token('--jh-line', '#eceef0', '浅分割线。'),
      token('--jh-line-strong', '#d8dde1', '表格、缩略图、强调边框。'),
      token('--jh-text-primary', 'rgba(0, 0, 0, 0.9)', '标题和主内容。'),
      token('--jh-text-secondary', 'rgba(0, 0, 0, 0.6)', '说明、次级操作。'),
      token('--jh-text-tertiary', 'rgba(0, 0, 0, 0.4)', '占位符、弱提示。')
    ]
  },
  {
    title: 'Radius, Space and Elevation',
    description: '圆角、间距、阴影和交互动效基准。',
    tokens: [
      token('--jh-radius-sm', '4px', '标签、小型控件圆角。'),
      token('--jh-radius-md', '6px', '按钮、输入、面板圆角。'),
      token('--jh-radius-lg', '8px', '卡片、凭证、弹窗圆角。'),
      token('--jh-radius-pill', '999px', '头像、状态点、胶囊控件。'),
      token('--jh-space-2', '8px', '小型元素间距。'),
      token('--jh-space-4', '16px', '常规内容间距。'),
      token('--jh-shadow', '0 6px 16px -8px rgba(16, 42, 67, .08)', '医生端卡片阴影兼容。'),
      token('--jh-shadow-popover', '0 24px 56px -24px rgba(16, 42, 67, .28)', '菜单、浮层、弹窗。')
    ]
  },
  {
    title: 'Controls and Data Display',
    description: '按钮、表格、输入、标签、消息气泡等可复用控件 token。',
    tokens: [
      token('--jh-btn-primary', 'linear-gradient(270deg, #3b92ff, #006ef9)', '主按钮背景。'),
      token('--jh-btn-outline-secondary-border', '#d8dde1', '次级按钮边框。'),
      token('--jh-switch-width', '60px', '开关宽度。'),
      token('--jh-checkbox-size', '24px', '复选框点击目标。'),
      token('--jh-search-field-width', '680px', '搜索框默认宽度。'),
      token('--jh-table-width', '680px', '表格和搜索区默认宽度。'),
      token('--jh-chat-bubble-max-width', '72%', '聊天气泡最大宽度。'),
      token('--jh-tag-bg', '#eceef0', '可删除标签背景。')
    ]
  }
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

const workspaceMenuGroups = [
  {
    title: '工作台',
    items: [
      { label: '首页', icon: 'home', active: true },
      { label: '数据看板', icon: 'dashboard' }
    ]
  },
  {
    title: '运营相关',
    items: [
      { label: '出诊管理', icon: 'briefcase' },
      { label: '值班打卡', icon: 'calendar' }
    ]
  }
]
const workspaceQueueItems = [
  { key: 'text', label: '图文问诊', value: 1 },
  { key: 'video', label: '视频问诊', value: 3 },
  { key: 'consult', label: '图文咨询', value: 2 }
]
const workspaceServices = [
  { key: 'text', label: '图文问诊', enabled: true },
  { key: 'video', label: '视频问诊', enabled: true },
  { key: 'consult', label: '图文咨询', enabled: true }
]
const workspaceQuickActions = [
  { title: '排班管理', desc: '查看值班安排', icon: 'quickCalendar', feature: 'schedule' },
  { title: '历史问诊', desc: '历史病历查询', icon: 'clock', feature: 'history' },
  { title: '组件系统', desc: '查看 Elements', icon: 'document', feature: 'elements' },
  { title: '', desc: '添加快捷入口', icon: 'plus', isAdd: true }
]

const componentItems = [
  {
    name: 'WorkspaceShell',
    importName: 'WorkspaceShell',
    description: '桌面工作台外壳，承载顶部栏、侧栏和页面内容。',
    api: ['collapsed', 'expanded', 'slots'],
    previewClass: 'component-card__preview--shell',
    previewSize: { width: 960, height: 560, thumbnailScale: 0.24 },
    preview: () =>
      h(
        WorkspaceShell,
        { collapsed: false, expanded: true },
        {
          topbar: () => h('header', { class: 'topbar docs-mini-topbar' }, '顶部栏'),
          sidebar: () => h(WorkspaceSidebar, { menuGroups: workspaceMenuGroups, collapsed: false }),
          default: () => h('main', { class: 'docs-mini-main' }, '工作台内容')
        }
      )
  },
  {
    name: 'WorkspaceSidebar',
    importName: 'WorkspaceSidebar',
    description: '左侧菜单、标签文本和汉堡收起/展开按钮。',
    api: ['menuGroups', 'collapsed', 'toggle'],
    previewClass: 'component-card__preview--sidebar',
    previewSize: { width: 160, height: 560, thumbnailScale: 0.36 },
    preview: () => h(WorkspaceSidebar, { menuGroups: workspaceMenuGroups, collapsed: false })
  },
  {
    name: 'WaitingStatusCard',
    importName: 'WaitingStatusCard',
    description: '桌面工作台候诊状态卡片。',
    api: ['total', 'items', 'title', 'hint'],
    previewClass: 'component-card__preview--workbench',
    previewSize: { width: 380, height: 260, thumbnailScale: 0.72 },
    preview: () => h(WaitingStatusCard, { total: 6, items: workspaceQueueItems })
  },
  {
    name: 'ConsultEntryCard',
    importName: 'ConsultEntryCard',
    description: '进入主工作流的高亮入口卡片，包含蓝色默认态和黄色待接诊态。',
    api: ['title', 'description', 'variant', 'hasQueue'],
    previewClass: 'component-card__preview--workbench',
    previewSize: { width: 760, height: 240, thumbnailScale: 0.38 },
    preview: () =>
      h('div', { class: 'consult-entry-preview-pair' }, [
        h(ConsultEntryCard, { variant: 'blue' }),
        h(ConsultEntryCard, { variant: 'yellow' })
      ])
  },
  {
    name: 'ServiceStatusCard',
    importName: 'ServiceStatusCard',
    description: '桌面工作台服务状态和开关集合。',
    api: ['status', 'services', 'toggle'],
    previewClass: 'component-card__preview--workbench',
    previewSize: { width: 440, height: 252, thumbnailScale: 0.62 },
    preview: () => h(ServiceStatusCard, { status: 'online', services: workspaceServices })
  },
  {
    name: 'QuickActionsPanel',
    importName: 'QuickActionsPanel',
    description: '高频操作入口，内置编辑态、注意点和排班展开面板。',
    api: ['actions', 'select', 'add', 'remove'],
    previewClass: 'component-card__preview--quick-actions',
    previewSize: { width: 375, height: 476, thumbnailScale: 0.43 },
    preview: () => h(QuickActionsPanel, { actions: workspaceQuickActions })
  },
  {
    name: 'RoomPendingWorkspace',
    importName: 'RoomPendingWorkspace',
    description: '待接诊问诊室骨架，复用右侧患者、诊断和药品占位样式。',
    api: ['patientFields', 'medicineHeaders', 'refresh'],
    previewClass: 'component-card__preview--pending-room',
    previewSize: { width: 1040, height: 640, thumbnailScale: 0.22 },
    preview: () => h(RoomPendingWorkspace, { skeletonCount: 3 })
  },
  {
    name: 'VideoCallWindow',
    importName: 'VideoCallWindow',
    description: 'H5 视频问诊画面和摄像头、麦克风控制。',
    api: ['cameraOn', 'micOn', 'patientImage', 'toggle'],
    previewClass: 'component-card__preview--video',
    previewSize: { width: 560, height: 240, thumbnailScale: 0.48 },
    preview: () => h(VideoCallWindow, { cameraOn: false, micOn: true, cameraStatusText: '摄像头已关闭' })
  },
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
        h(Avatar, { name: '嘉虹' }),
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
    previewSize: { width: 380, height: 240, thumbnailScale: 0.68 },
    preview: () => h(FollowUpVoucher, { title: '复诊凭证', variant: 'mixed', images: voucherImages, voices: voucherVoices })
  },
  {
    name: 'ConsultInfoCard',
    importName: 'ConsultInfoCard',
    description: '问诊病情描述、图片和语音附件展示。',
    api: ['description', 'images', 'voices', 'preview-image'],
    previewClass: 'component-card__preview--consult-info',
    previewSize: { width: 380, height: 240, thumbnailScale: 0.68 },
    preview: () =>
      h(ConsultInfoCard, {
        title: '咨询信息',
        description: '咳嗽三天，有黄痰，夜间咳嗽明显，体温 37.4。',
        images: voucherImages.slice(0, 2),
        voices: voucherVoices.slice(0, 1)
      })
  },
  {
    name: 'MedicineRiskTip',
    importName: 'MedicineRiskTip',
    description: '处方药品行下方的 H5 风险提示卡。',
    api: ['level', 'categories', 'message', 'suggestion'],
    previewClass: 'component-card__preview--risk-tip',
    previewSize: { width: 440, height: 180, thumbnailScale: 0.62 },
    preview: () =>
      h(MedicineRiskTip, {
        title: '药品风险提示 · 盐酸氨溴索片',
        level: 'severe',
        levelLabel: '严重警告',
        categories: ['用法用量'],
        message: '[警示信息]盐酸氨溴索片当前频次与用量需核对，请确认是否符合患者咳嗽咳痰情况。',
        suggestion: '[建议信息]请调整服用频次或用量后，再提交处方。',
        activeMedicineIndex: 1
      })
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

const migrationItems = [
  {
    title: '基础组件',
    state: '已上移',
    tone: 'success',
    description: '19 个 Vue 组件已从统一入口导出，覆盖基础控件、首页工作台、视频问诊和处方风险提示。',
    path: 'import { StatusBadge } from "@jiahong/ui"'
  },
  {
    title: 'Design Tokens',
    state: '深化中',
    tone: 'info',
    description: '颜色、字体、圆角、阴影、按钮、输入、表格、标签和聊天气泡 token 已集中到 styles/index.css。',
    path: 'import "@jiahong/ui/styles.css"'
  },
  {
    title: '共享资产',
    state: '已上移',
    tone: 'success',
    description: 'logo、问诊类型图标、空状态、附件、搜索、视频和字体资产由 assetUrl 统一解析。',
    path: 'assetUrl("assets/figma-room/video-consult.svg")'
  },
  {
    title: '医生端业务布局',
    state: '拆分中',
    tone: 'info',
    description: '首页桌面工作台和高频入口已组件化；处方编辑、风险检测弹窗等仍包含医生端流程与字段，暂不迁入 UI。',
    path: 'WorkspaceShell / QuickActionsPanel'
  }
]

const tokens = tokenGroups.flatMap((group) => group.tokens)

const filteredComponents = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return componentItems
  return componentItems.filter((item) => `${item.name} ${item.description} ${item.api.join(' ')}`.toLowerCase().includes(keyword))
})

const filteredTokenGroups = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return tokenGroups
  return tokenGroups
    .map((group) => ({
      ...group,
      tokens: group.tokens.filter((item) => `${group.title} ${item.name} ${item.value} ${item.detail}`.toLowerCase().includes(keyword))
    }))
    .filter((group) => group.tokens.length > 0)
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

function componentPreviewSize(item) {
  return item.previewSize || defaultPreviewSize
}

function previewFrameStyle(item) {
  const size = componentPreviewSize(item)
  return {
    '--preview-width': `${size.width}px`,
    '--preview-height': `${size.height}px`,
    '--preview-scale': size.thumbnailScale
  }
}

function previewDialogStyle(item) {
  const size = componentPreviewSize(item)
  return {
    '--preview-width': `${size.width}px`,
    '--preview-height': `${size.height}px`
  }
}

function previewSizeLabel(item) {
  const size = componentPreviewSize(item)
  return `${size.width} × ${size.height}`
}

function openComponentPreview(item) {
  activePreview.value = item
}

function closeComponentPreview() {
  activePreview.value = null
}

function handlePreviewKeydown(event) {
  if (event.key === 'Escape') closeComponentPreview()
}

function token(name, value, detail) {
  return {
    name,
    value,
    detail,
    css: `${name}: ${value};`
  }
}

async function copyToken(tokenItem) {
  try {
    await navigator.clipboard.writeText(tokenItem.name)
    copiedToken.value = tokenItem.name
    window.setTimeout(() => {
      if (copiedToken.value === tokenItem.name) copiedToken.value = ''
    }, 1200)
  } catch {
    copiedToken.value = ''
  }
}

onMounted(() => {
  window.addEventListener('keydown', handlePreviewKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handlePreviewKeydown)
})
</script>
