// ─── r3code-tech: точка входа стилей темы ──────────────────────────────────
// Slidev автоматически загружает styles/index.ts из темы.
// Порядок важен: базовые layouts-base → шрифты → переменные → типографика → layouts → progressive.

// Базовые стили лейаутов ядра Slidev (даёт разметку center/two-cols/image/… ),
// поверх которых тема накладывает свою типографику.
import '@slidev/client/styles/layouts-base.css'

// Самостоятельно хостим шрифты: офлайн-показ, OFL, кириллица.
// Noto Sans — тело (humanist sans, хорошая кириллица), Fira Code — код.
import '@fontsource/noto-sans/400.css'
import '@fontsource/noto-sans/700.css'
import '@fontsource/fira-code/400.css'
import '@fontsource/fira-code/700.css'

// Бренд-токены (light + dark) → типографика → layouts → progressive.
import './vars.css'
import './base.css'
import './layouts.css'
import './progressive.css'
