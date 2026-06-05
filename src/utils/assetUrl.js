export function assetUrl(path) {
  const normalizedPath = String(path ?? '')
    .replace(/^\/+/, '')
    .replace(/^assets\//, '')

  const assetBase =
    import.meta.env?.VITE_JH_ASSET_BASE ||
    (import.meta.env?.DEV ? '../../assets/' : '../assets/')

  if (!normalizedPath) {
    return new URL(/* @vite-ignore */ assetBase, import.meta.url).href
  }

  return new URL(/* @vite-ignore */ `${assetBase}${normalizedPath}`, import.meta.url).href
}
