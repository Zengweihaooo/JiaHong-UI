<template>
  <section class="room-card room-card--pending-consult" aria-label="待接诊问诊室">
    <div class="room-pending-toolbar">
      <button class="jh-btn jh-btn--md jh-btn--outline-secondary room-refresh" type="button" @click="$emit('refresh')">
        {{ refreshLabel }}
      </button>
    </div>
    <div class="consult-workspace room-pending-workspace">
      <section class="chat-panel room-pending-chat-panel" aria-label="待接诊聊天区域">
        <div class="room-pending-chat-skeleton" aria-hidden="true">
          <span v-for="index in skeletonCount" :key="index"></span>
        </div>
        <div class="room-pending-chat-empty" aria-hidden="true"></div>
      </section>
      <section class="prescription-panel room-pending-prescription-panel" aria-label="待接诊处方区域">
        <div class="patient-info room-pending-patient-info">
          <div class="patient-info__grid">
            <span v-for="field in patientFields" :key="field.label" class="patient-info__field">
              <span class="patient-info__field-label"><em v-if="field.required">*</em>{{ field.label }}：</span>
              <span class="patient-info__field-value">{{ field.value }}</span>
            </span>
          </div>
        </div>
        <div class="section-divider"></div>
        <div class="diagnosis-section consultation-diagnosis-section room-pending-diagnosis">
          <h3>{{ diagnosisTitle }}</h3>
          <div class="diagnosis-row">
            <label><span>*</span>诊断</label>
            <button class="jh-input-field jh-input-field--lg diagnosis-select" type="button" disabled>
              {{ diagnosisPlaceholder }}
            </button>
            <div class="diagnosis-input" aria-disabled="true"></div>
          </div>
        </div>
        <div class="section-divider"></div>
        <div class="medicine-section consultation-medicine-section room-pending-medicine-section">
          <h3>{{ medicineTitle }}</h3>
          <div class="medicine-scroll-area">
            <div class="medicine-search-combobox">
              <label class="jh-search-field medicine-search is-disabled">
                <span class="jh-search-field__icon" aria-hidden="true">
                  <img :src="assetUrl('assets/search-icon.png')" alt="" />
                </span>
                <input type="text" :placeholder="medicinePlaceholder" :aria-label="medicinePlaceholder" disabled />
              </label>
            </div>
            <div class="medicine-table room-pending-medicine-table" aria-label="所需药品">
              <div class="medicine-table__row medicine-table__head">
                <span v-for="header in medicineHeaders" :key="header">{{ header }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="room-pending-prescription-spacer"></div>
        <div class="prescription-actions room-pending-prescription-actions">
          <span class="prescription-remark-field">
            <span class="prescription-remark-field__label">{{ remarkLabel }}：</span>
          </span>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { assetUrl } from '../../utils/assetUrl.js'

defineOptions({
  name: 'RoomPendingWorkspace'
})

defineProps({
  refreshLabel: {
    type: String,
    default: '刷新列表'
  },
  skeletonCount: {
    type: Number,
    default: 4
  },
  patientFields: {
    type: Array,
    default: () => [
      { label: '过敏史', value: '无' },
      { label: '肝功能异常', value: '否', required: true },
      { label: '妊娠哺乳', value: '无', required: true },
      { label: '肾功能异常', value: '否', required: true }
    ]
  },
  diagnosisTitle: {
    type: String,
    default: '诊断意见'
  },
  diagnosisPlaceholder: {
    type: String,
    default: '请选择诊断'
  },
  medicineTitle: {
    type: String,
    default: '所需药品'
  },
  medicinePlaceholder: {
    type: String,
    default: '请输入药品名称或首字母做模糊查询'
  },
  medicineHeaders: {
    type: Array,
    default: () => ['序号', '药品名称', '类型', '规格', '用法', '服用频次', '用量', '数量', '单位', '风险', '操作']
  },
  remarkLabel: {
    type: String,
    default: '处方备注'
  }
})

defineEmits(['refresh'])
</script>
