<template>
  <aside class="sidebar" aria-label="主菜单">
    <div class="sidebar__brand">
      <img class="brand-mark" :src="logoSrc" :alt="logoAlt" />
    </div>
    <nav class="sidebar__content">
      <template v-for="group in menuGroups" :key="group.title">
        <div class="menu-section">{{ group.title }}</div>
        <button
          v-for="item in group.items"
          :key="`${group.title}-${item.label}`"
          :class="['menu-item', { 'is-active': item.active }]"
          type="button"
          @click="$emit('select-item', { item, group })"
        >
          <img class="menu-icon" :src="menuIcon(item.icon)" alt="" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </button>
      </template>
    </nav>
    <div class="sidebar__footer">
      <button
        class="sidebar-toggle"
        type="button"
        :aria-label="collapsed ? expandLabel : collapseLabel"
        :aria-expanded="!collapsed"
        @click="$emit('toggle')"
      >
        <img class="menu-icon" :src="hamburgerSrc" alt="" aria-hidden="true" />
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { assetUrl } from '../../utils/assetUrl.js'

defineOptions({
  name: 'WorkspaceSidebar'
})

const props = defineProps({
  menuGroups: {
    type: Array,
    default: () => []
  },
  collapsed: {
    type: Boolean,
    default: false
  },
  logo: {
    type: String,
    default: 'assets/figma-home/logo.png'
  },
  logoAlt: {
    type: String,
    default: '嘉虹健康'
  },
  hamburgerIcon: {
    type: String,
    default: 'assets/figma-home/menu-icon.svg'
  },
  iconMap: {
    type: Object,
    default: () => ({})
  },
  expandLabel: {
    type: String,
    default: '展开主菜单'
  },
  collapseLabel: {
    type: String,
    default: '收起主菜单'
  }
})

defineEmits(['toggle', 'select-item'])

const defaultIconMap = {
  home: 'assets/figma-home/home.svg',
  dashboard: 'assets/figma-home/trello.svg',
  circle: 'assets/figma-home/disc.svg',
  clipboard: 'assets/figma-home/clipboard.svg',
  checkSquare: 'assets/figma-home/check-square.svg',
  briefcase: 'assets/figma-home/briefcase.svg',
  calendar: 'assets/figma-home/calendar.svg',
  user: 'assets/figma-home/user.svg',
  shield: 'assets/figma-home/pocket.svg'
}

const logoSrc = computed(() => assetUrl(props.logo))
const hamburgerSrc = computed(() => assetUrl(props.hamburgerIcon))

function menuIcon(name) {
  return assetUrl(props.iconMap[name] || defaultIconMap[name] || defaultIconMap.clipboard)
}
</script>

<style>
.sidebar {
  position: sticky;
  top: 0;
  grid-column: 1;
  grid-row: 1 / span 2;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  height: 100vh;
  overflow: hidden;
  overscroll-behavior: contain;
  background: var(--jh-card);
  box-shadow: var(--jh-shadow);
}

.sidebar__brand {
  flex: 0 0 56px;
  display: flex;
  align-items: center;
  width: 160px;
  height: 56px;
  padding: 18px 20px;
}

.brand-mark {
  display: block;
  width: 79px;
  height: 20px;
  object-fit: contain;
}

.sidebar__content {
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  scrollbar-gutter: stable;
  padding: 0 8px;
}

.sidebar__content::-webkit-scrollbar {
  width: 6px;
  height: 0;
}

.sidebar__content::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.16);
}

.sidebar__content::-webkit-scrollbar-track {
  background: transparent;
}

.menu-section {
  display: flex;
  align-items: flex-end;
  width: 144px;
  height: 40px;
  padding: 16px 16px 4px;
  color: var(--jh-text-tertiary);
  font-size: 12px;
  line-height: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 144px;
  height: 36px;
  margin-bottom: 4px;
  padding: 7px 16px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--jh-text-secondary);
  cursor: pointer;
  font-size: 14px;
  line-height: 22px;
  text-align: left;
}

.menu-icon {
  display: block;
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.menu-item span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-item:hover {
  background: #f5f9ff;
  color: var(--jh-blue);
}

.menu-item.is-active {
  background: linear-gradient(90deg, #d1e5fe 0%, #e9f3ff 100%);
  color: var(--jh-blue);
}

.sidebar__footer {
  flex: 0 0 56px;
  display: flex;
  align-items: center;
  width: 160px;
  height: 56px;
  padding: 14px 16px;
  border-top: 1px solid var(--jh-line);
  color: var(--jh-text-secondary);
}

.sidebar-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.sidebar-toggle:hover {
  background: #f5f9ff;
  color: var(--jh-blue);
}

.sidebar-toggle .menu-icon,
.sidebar__footer svg {
  width: 16px;
  height: 16px;
  margin-right: 0;
}

.app-shell.is-sidebar-collapsed .sidebar__brand {
  width: var(--sidebar-collapsed-width);
  padding: 18px 14px;
}

.app-shell.is-sidebar-expanded .sidebar__brand {
  width: 160px;
  padding: 18px 20px;
}

.app-shell.is-sidebar-collapsed .brand-mark {
  width: 44px;
  height: auto;
}

.app-shell.is-sidebar-expanded .brand-mark {
  width: 79px;
  height: 20px;
}

.app-shell.is-sidebar-collapsed .sidebar__content {
  padding: 8px;
}

.app-shell.is-sidebar-expanded .sidebar__content {
  padding: 0 8px;
}

.app-shell.is-sidebar-collapsed .menu-section {
  display: none;
}

.app-shell.is-sidebar-expanded .menu-section {
  display: flex;
}

.app-shell.is-sidebar-collapsed .menu-item {
  justify-content: center;
  width: 56px;
  padding: 7px;
}

.app-shell.is-sidebar-expanded .menu-item {
  justify-content: flex-start;
  width: 144px;
  padding: 7px 16px;
}

.app-shell.is-sidebar-collapsed .menu-icon {
  margin-right: 0;
}

.app-shell.is-sidebar-expanded .menu-icon {
  margin-right: 8px;
}

.app-shell.is-sidebar-collapsed .menu-item span {
  display: none;
}

.app-shell.is-sidebar-expanded .menu-item span {
  display: block;
}

.app-shell.is-sidebar-collapsed .sidebar__footer {
  justify-content: center;
  width: var(--sidebar-collapsed-width);
}

.app-shell.is-sidebar-expanded .sidebar__footer {
  justify-content: flex-start;
  width: 160px;
}
</style>
