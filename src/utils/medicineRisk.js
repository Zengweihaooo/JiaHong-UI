const visibleMedicineRiskTags = new Set(['高', '低'])

export function shouldShowMedicineRiskTag(risk = '') {
  return visibleMedicineRiskTags.has(String(risk).trim())
}
