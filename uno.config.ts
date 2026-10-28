import { defineConfig } from 'unocss'

/**
 * UnoCSS-конфиг темы r3code-tech.
 *
 * Пробрасывает бренд-токены (объявленные в styles/vars.css как CSS-переменные)
 * в утилиты UnoCSS, чтобы в layouts/компонентах можно было писать
 * `text-ink`, `bg-paper`, `text-muted` и т.п.
 * Значения — это `var(--…)`, поэтому свет/тьма переключаются автоматически.
 */
export default defineConfig({
  theme: {
    colors: {
      // Нейтральная база
      paper: 'var(--vi-text-on-dark)', // фон разделителей (белый на свету, чёрный в тёмной)
      ink: 'var(--vi-text)', // основной текст
      muted: 'var(--vi-version-color)', // мета, подписи, версии
      code: 'var(--vi-code-bg)', // фон кода
      hair: 'var(--vi-table-border)', // разделители, рамки
    },
  },
})
