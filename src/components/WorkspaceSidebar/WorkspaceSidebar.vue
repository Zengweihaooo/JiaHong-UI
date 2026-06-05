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
  grid-column: 1;
  grid-row: 1 / span 2;
  display: flex;
  flex-direction: column;
  width: var(--jh-sidebar-width);
  min-width: var(--jh-sidebar-width);
  height: 100vh;
  overflow: hidden;
  background: #ffffff;
  box-shadow: var(--jh-shadow);
  transition: width 200ms ease, min-width 200ms ease;
}

.sidebar__brand {
  display: flex;
  align-items: center;
  width: 100%;
  height: 104px;
  padding: 24px;
  overflow: hidden;
}

.brand-mark {
  display: block;
  width: 124px;
  height: auto;
}

.sidebar__content {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 0 10px;
}

.menu-section {
  margin: 14px 0 6px;
  padding: 0 20px;
  color: var(--jh-text-muted);
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 44px;
  padding: 0 18px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--jh-text-secondary);
  cursor: pointer;
  font: inherit;
  font-size: 16px;
  line-height: 24px;
  text-align: left;
  white-space: nowrap;
}

.menu-icon {
  display: block;
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
}

.menu-item:hover,
.menu-item.is-active {
  background: #ebf3ff;
  color: var(--jh-blue);
}

.sidebar__footer {
  display: flex;
  align-items: center;
  height: 68px;
  padding: 0 20px;
  border-top: 1px solid #e5e8eb;
}

.sidebar-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
}

.sidebar-toggle:hover {
  background: #f2f3f4;
}

.app-shell.is-sidebar-collapsed .sidebar__brand,
.app-shell.is-sidebar-collapsed .sidebar__content {
  opacity: 0;
  pointer-events: none;
}

.app-shell.is-sidebar-collapsed .sidebar__footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 40;
  width: 64px;
  background: #ffffff;
  opacity: 1;
  pointer-events: auto;
}
</style>
