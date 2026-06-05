<template>
  <div
    :class="[
      'app-shell app-shell--responsive',
      collapsed ? 'is-sidebar-collapsed' : expanded ? 'is-sidebar-expanded' : ''
    ]"
  >
    <slot name="topbar" />
    <slot name="sidebar" />
    <slot />
    <slot name="dialogs" />
  </div>
</template>

<script setup>
defineOptions({
  name: 'WorkspaceShell'
})

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  },
  expanded: {
    type: Boolean,
    default: false
  }
})
</script>

<style>
.app-shell {
  --sidebar-width: 160px;
  --sidebar-collapsed-width: 72px;
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  grid-template-rows: 56px minmax(0, 1fr);
  width: 100%;
  min-height: 100vh;
  background: var(--jh-bg);
  color: var(--jh-text-primary);
  transition: grid-template-columns 180ms ease;
}

.app-shell.is-sidebar-collapsed {
  --sidebar-width: var(--sidebar-collapsed-width);
}

.app-shell.is-sidebar-expanded {
  --sidebar-width: 160px;
}

.app-shell--responsive {
  min-width: 0;
}

@media (max-width: 900px) {
  .app-shell--responsive {
    grid-template-columns: 0 minmax(0, 1fr);
  }
}
</style>
