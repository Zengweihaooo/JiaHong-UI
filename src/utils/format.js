export const durationToneThresholds = {
  warning: 179,
  danger: 600
}

export function formatDuration(totalSeconds = 0) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':')
}

export function durationTone(totalSeconds = 0) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0)

  if (safeSeconds >= durationToneThresholds.danger) return 'danger'
  if (safeSeconds >= durationToneThresholds.warning) return 'warning'
  return 'normal'
}

export function statusLabel(status = 'offline') {
  return (
    {
      online: '在线',
      busy: '忙碌',
      offline: '离线',
      success: '正常',
      warning: '提醒',
      danger: '异常',
      info: '信息',
      neutral: '默认'
    }[status] || status
  )
}

export function typeLabel(type = 'consult') {
  return (
    {
      video: '视频',
      text: '图文',
      consult: '咨询'
    }[type] || type
  )
}
