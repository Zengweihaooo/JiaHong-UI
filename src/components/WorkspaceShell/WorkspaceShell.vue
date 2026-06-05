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
  --jh-sidebar-width: 199px;
  --jh-topbar-height: 56px;
  --jh-main-gap: 28px;
  --jh-content-max: 1804px;
  --jh-consult-card-width: 1152px;
  --jh-consult-top-gap: 28px;
  position: relative;
  display: grid;
  grid-template-columns: var(--jh-sidebar-width) minmax(0, 1fr);
  grid-template-rows: var(--jh-topbar-height) minmax(0, 1fr);
  width: 100%;
  min-width: 1200px;
  min-height: 100vh;
  overflow: hidden;
  background: #f2f3f4;
  color: var(--jh-text-primary);
}

.app-shell.is-sidebar-collapsed {
  --jh-sidebar-width: 0px;
}

.app-shell.is-sidebar-expanded {
  --jh-sidebar-width: 199px;
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
