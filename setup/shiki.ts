import { defineShikiSetup } from '@slidev/types'

/**
 * Подсветка кода темы r3code-tech.
 *
 * vitesse-light — светлая тема с хорошим контрастом для кода.
 * В тёмной теме Slidev автоматически использует vitesse-dark.
 *
 * Тема не входит в bundled-набор по умолчанию, но Slidev её подтянет
 * из shiki bundled themes.
 */
export default defineShikiSetup(() => {
  return {
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  }
})
