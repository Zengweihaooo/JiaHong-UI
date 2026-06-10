<template>
  <section
    class="medicine-risk-tip"
    data-medicine-risk-tip
    role="dialog"
    aria-label="药品风险提示"
    :data-active-medicine-index="activeMedicineIndex || undefined"
    :hidden="hidden"
  >
    <div class="medicine-risk-tip__head">
      <h4 data-medicine-risk-title>{{ title }}</h4>
      <span class="medicine-risk-tip__hint">{{ hint }}</span>
      <button class="medicine-risk-tip__close" type="button" aria-label="关闭风险提示" @click="$emit('close')"></button>
    </div>
    <div class="medicine-risk-tip__meta">
      <span :class="['medicine-risk-tip__level', `medicine-risk-tip__level--${level}`]" data-medicine-risk-level>
        {{ levelLabel }}
      </span>
      <span class="medicine-risk-tip__categories" data-medicine-risk-categories>
        <span v-for="category in visibleCategories" :key="category" class="medicine-risk-tip__category">{{ category }}</span>
      </span>
    </div>
    <p class="medicine-risk-tip__message" data-medicine-risk-message>{{ message }}</p>
    <p class="medicine-risk-tip__suggestion" data-medicine-risk-suggestion>{{ suggestion }}</p>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "药品风险提示"
  },
  hint: {
    type: String,
    default: "点击有风险药品行切换详情"
  },
  level: {
    type: String,
    default: ""
  },
  levelLabel: {
    type: String,
    default: ""
  },
  categories: {
    type: Array,
    default: () => []
  },
  message: {
    type: String,
    default: ""
  },
  suggestion: {
    type: String,
    default: ""
  },
  activeMedicineIndex: {
    type: [String, Number],
    default: ""
  },
  hidden: {
    type: Boolean,
    default: false
  }
});

defineEmits(["close"]);

const visibleCategories = computed(() => props.categories.filter(Boolean));
</script>
