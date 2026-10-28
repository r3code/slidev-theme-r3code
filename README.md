# slidev-theme-r3code-tech

[![CI](https://github.com/r3code/slidev-theme-r3code/actions/workflows/ci.yml/badge.svg)](https://github.com/r3code/slidev-theme-r3code/actions/workflows/ci.yml)
[![Slidev](https://img.shields.io/badge/Slidev-%E2%89%A552-000000)](https://sli.dev)
[![License](https://img.shields.io/badge/license-PolyForm%20Noncommercial-000000)](LICENSE)

Тема **r3code-tech** для [Slidev](https://github.com/slidevjs/slidev): инженерный стиль для технических докладов. Чёрный текст на белом фоне, тёмные разделители секций с инверсией в тёмной теме, Noto Sans + Fira Code (self-hosted, кириллица), ProgressiveList с пошаговым появлением через v-click, 8 готовых layouts.

Сделана на основе стилей из доклада [«Сбор логов на vector и clickhouse – то, что ИИ за тебя не сделал бы»](https://github.com/r3code/report-logs-collection-in-ai-era) (HardFest 2026). Структура и принципы — по образцу [slidev-theme-bear](https://github.com/jtprogru/slidev-theme-bear) Михаила Савина.

## Принципы

- **Чёрный на белом** — никаких цветовых акцентов, только текст и код
- **Тёмные разделители** — `layout: section` даёт чёрный фон + белый текст в светлой теме, инверсию в тёмной
- **Self-hosted шрифты** — Noto Sans + Fira Code через `@fontsource`, работают офлайн
- **Progressive Disclosure** — `ProgressiveList` с `•` и `➜` маркерами по v-click
- **8 layouts** — cover, default, end, section, two-column, image-full, stat, quote
- **4 компонента** — ProgressiveList, SlideNumber, Counter, ImageWithCaption

## Требования

- Node `^22.0.0 || ^24.0.0 || >=26.0.0`
- Slidev `>= 52`

## Установка

Тема не публикуется в npm — ставится из GitHub:

```bash
npm i -D github:r3code/slidev-theme-r3code
```

Во frontmatter `slides.md`:

```yaml
---
theme: r3code-tech
---
```

Slidev разворачивает `r3code-tech` в имя пакета `slidev-theme-r3code-tech` и находит его в `node_modules`.

## Layouts

| Layout | Назначение | Особые опции |
| --- | --- | --- |
| `cover` | Титульный слайд | `coverImage:`, `logo: true`, `version:` |
| `default` | Базовый контентный слайд + номер | — |
| `end` | Финальный слайд (вопросы, QR) | `logo: true` |
| `section` | Разделитель секции (bg-black) | `sectionNum: '01'` |
| `two-column` | Две колонки | `::right::` slot |
| `image-full` | Картинка на весь слайд | `image:`, `dim: true` |
| `stat` | Крупная KPI-цифра | `number:`, `label:` |
| `quote` | Центрированная цитата | `author:` |

> Логотип `r3code-logo.png` (в `public/`) — квадратный, с белым фоном, одинаково читается в светлой и тёмной теме. Один файл на обе темы.

## Компоненты

Автоимпортируются, доступны в любом слайде без импорта:

### `<ProgressiveList>`

Список с пошаговым появлением через v-click. Маркеры: `•` для пройденных, `➜` для активного.

```vue
<ProgressiveList :items="[
  'Первый пункт',
  'Второй пункт',
  'Третий пункт'
]" />
```

Или через slots для форматированного текста:

```vue
<ProgressiveList>
  <li>Первый <strong>пункт</strong></li>
  <li>Второй пункт</li>
</ProgressiveList>
```

### `<SlideNumber>`

Номер слайда в правом верхнем углу. Автоматически скрыт на первом и последнем слайдах. Встроен в `default`, `two-column`, `image-full`, `stat`, `quote`.

### `<Counter>`

Анимированный счётчик для KPI-слайдов. Считает от 0 до target при появлении слайда.

```vue
<div class="text-5xl font-bold">
  <Counter :target="100" :duration="2000" />
</div>
<p>сервисов в продакшене</p>
```

### `<ImageWithCaption>`

Картинка по центру + подпись снизу. Гарантированно не вылезает за края слайда.

```vue
<ImageWithCaption
  src="/images/meme.jpg"
  caption="Подпись под картинкой"
  alt="Мем"
/>
```

Props: `src` (обязательный), `caption`, `alt`, `topPad` (по умолчанию 130px), `bottomPad` (по умолчанию 90px).

## Тёмная тема

Тема поддерживает обе темы (`colorSchema: both` в package.json).

**Разделители (layout: section):**

- Светлая тема → **чёрный фон + белый текст**
- Тёмная тема → **белый фон + чёрный текст** (инверсия)

Это сделано чтобы разделитель всегда был контрастным и не сливался с фоном страницы.

## Подсветка кода

Тема использует shiki с `vitesse-light` / `vitesse-dark` (см. `setup/shiki.ts`). Строковые значения в YAML подсвечены ярко-синим для контраста.

## Локальная разработка

```bash
git clone https://github.com/r3code/slidev-theme-r3code.git
cd slidev-theme-r3code
npm install
npm run dev          # dev-сервер с example.md
npm run build        # сборка example.md в dist/
npm run export:pdf   # экспорт в PDF с --with-clicks
```

В `example.md` стоит `theme: ./` — Slidev использует тему из текущей директории.

## Структура

```
slidev-theme-r3code/
├── components/          # Глобальные компоненты (автоимпорт)
│   ├── ProgressiveList.vue
│   ├── SlideNumber.vue
│   ├── Counter.vue
│   └── ImageWithCaption.vue
├── layouts/             # 8 layouts
│   ├── cover.vue
│   ├── default.vue
│   ├── end.vue
│   ├── section.vue
│   ├── two-column.vue
│   ├── image-full.vue
│   ├── stat.vue
│   └── quote.vue
├── public/              # Бренд-логотип + favicon
│   ├── r3code-logo.png  # Квадратный, с белым фоном — одинаков для обеих тем
│   └── favicon.png      # Favicon 128×128 (с r3code.ru)
├── setup/               # Хуки Slidev
│   └── shiki.ts         # Тема подсветки кода (vitesse-light/dark)
├── styles/              # Стили темы
│   ├── index.ts         # Точка входа (импорт CSS + шрифтов)
│   ├── vars.css         # CSS-переменные (light + dark)
│   ├── base.css         # Типографика, размеры, код, таблицы
│   ├── layouts.css      # Layout-специфичные стили
│   └── progressive.css  # ProgressiveList стили
├── .github/workflows/   # CI
│   └── ci.yml           # Lint + build demo + deploy
├── example.md           # Демо-колода (превью темы)
├── layoutHelper.ts      # Утилита для image-full background
├── uno.config.ts        # UnoCSS токены
├── package.json
└── LICENSE              # PolyForm Noncommercial 1.0.0
```

## Лицензия

[PolyForm Noncommercial 1.0.0](LICENSE) — некоммерческое использование. Коммерческое — по отдельной лицензии.

Copyright © 2026 Дмитрий Синявский
