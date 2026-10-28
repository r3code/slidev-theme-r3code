import type { CSSProperties } from 'vue'

/**
 * Resolve urls from frontmatter and append with the base url.
 * Нужен для layout: image-full (background image через frontmatter).
 */
export function resolveAssetUrl(url: string) {
  if (url.startsWith('/'))
    return import.meta.env.BASE_URL + url.slice(1)
  return url
}

/**
 * Build CSS background style from frontmatter `image:` prop.
 * Если image — цвет (#xxx, rgb, hsl), ставит его фоном.
 * Если image — URL, ставит background-image: url(...).
 * `dim: true` добавляет полупрозрачный чёрный overlay для читаемости текста.
 */
export function handleBackground(background?: string, dim = false): CSSProperties {
  const isColor = background && ['#', 'rgb', 'hsl'].some(v => background.startsWith(v))

  const style: CSSProperties = {
    background: isColor
      ? background
      : undefined,
    color: (background && !isColor)
      ? 'white'
      : undefined,
    backgroundImage: isColor
      ? undefined
      : background
        ? dim
          ? `linear-gradient(#0005, #0008), url(${resolveAssetUrl(background)})`
          : `url("${resolveAssetUrl(background)}")`
        : undefined,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }

  if (!style.background)
    delete style.background

  return style
}
