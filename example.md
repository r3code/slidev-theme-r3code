---
theme: ./
title: r3code-tech — тема Slidev
info: |
  Демо-колода темы r3code-tech.
  Инженерный стиль: чёрный на белом, тёмные разделители, ProgressiveList, 8 layouts.
class: text-center
fonts:
  sans: 'Noto Sans'
  mono: 'Fira Code'
layout: cover
coverImage: ''
logo: true
version: 0.1.0 demo
routeAlias: cover
---

# r3code-tech

Инженерная тема для Slidev

<div class="pt-12">
  <span class="text-xl opacity-70">Чёрный на белом. Noto Sans + Fira Code. 8 layouts.</span>
</div>

<!--
Это демо-колода темы r3code-tech. Покажу все layouts и компоненты.
-->

---
layout: default
routeAlias: about
---

# Зачем эта тема

Тема сделана для технических докладов — SRE, DevOps, инфраструктура.

**Принципы:**

- Чёрный текст на белом фоне, без цветовых акцентов
- Тёмные разделители секций с инверсией в тёмной теме
- Noto Sans для текста, Fira Code для кода
- ProgressiveList с пошаговым появлением через v-click
- 8 готовых layouts для типовых слайдов доклада

> Тема не публикуется в npm — ставится из GitHub.

---
layout: section
sectionNum: '01'
routeAlias: layouts
---

# Layouts

8 способов разложить слайд

---
layout: default
---

# default

Базовый контентный слайд с номером в правом верхнем углу.

Номер автоматически скрыт на первом и последнем слайдах.

**Использование:**

```yaml
---
layout: default
---
# Заголовок
Текст слайда
```

---
layout: two-column
---

# two-column

Слева — мысль, справа — код или картинка.

Использует named slot `::right::` для правой колонки.

::right::

```yaml
---
layout: two-column
---
# Левая колонка
Текст
::right::
# Правая колонка
Код или картинка
```

---
layout: stat
number: '100'
label: 'сервисов в продакшене'
---

# stat

Крупная KPI-цифра по центру.

Можно через frontmatter `number:` + `label:`, или через slot.

---
layout: quote
author: 'Линус Торвальдс'
---

# Talk is cheap. Show me the code.

---
layout: image-full
image: https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200
dim: true
---

# image-full

Картинка на весь слайд с заголовком поверх.

`image:` — путь или URL, `dim: true` — затемнить для читаемости.

---
layout: section
sectionNum: '02'
routeAlias: components
---

# Компоненты

4 глобальных компонента

---
layout: default
clicks: 3
---

# ProgressiveList

Список с пошаговым появлением через v-click.

Маркеры: `•` для пройденных, `➜` для активного.

<ProgressiveList :items="[
  'Первый пункт — появляется сразу',
  'Второй пункт — по клику',
  'Третий пункт — по следующему клику',
  'Четвёртый — и так далее'
]" />

<!--
Нажми пробел чтобы увидеть пошаговое появление.
-->

---
layout: default
---

# Counter

Анимированный счётчик для KPI-слайдов.

Считает от 0 до target при появлении слайда.

<div class="text-5xl font-bold">
  <Counter :target="42" :duration="2000" />
</div>

<p class="text-xl mt-4">сервиса мониторим в продакшене</p>

---
layout: default
---

# ImageWithCaption

Картинка по центру + подпись снизу.

Гарантированно не вылезает за края слайда (absolute top/bottom в пикселях).

<ImageWithCaption
  src="https://placehold.co/600x400/000000/FFFFFF/png?text=ImageWithCaption"
  caption="Подпись под картинкой"
  alt="Пример ImageWithCaption"
/>

---
layout: section
sectionNum: '03'
routeAlias: dark-mode
---

# Тёмная тема

Разделители инвертируются

---
layout: default
---

# Тёмная тема и разделители

Тема поддерживает обе темы. Переключатель — в настройках Slidev.

**Разделители (layout: section):**

- Светлая тема → **чёрный фон + белый текст**
- Тёмная тема → **белый фон + чёрный текст** (инверсия)

Это сделано чтобы разделитель всегда был контрастным и не сливался с фоном.

---
layout: section
sectionNum: '04'
routeAlias: code
---

# Код

Fira Code 16pt, shiki vitesse-light

---
layout: default
---

# Подсветка кода

Тема использует shiki с `vitesse-light` / `vitesse-dark`.

```python
from typing import Protocol

class LogCollector(Protocol):
    """Интерфейс сборщика логов."""
    def collect(self, source: str) -> list[dict]:
        """Собрать логи из источника."""
        ...

    def transform(self, raw: dict) -> dict:
        """Нормализовать запись."""
        ...
```

---
layout: default
---

# YAML с подсветкой

Строковые значения подсвечены ярко-синим для контраста.

```yaml
sources:
  kubernetes:
    api_endpoint: https://k8s.api.internal
    namespace: production
    labels:
      team: sre
      tier: critical

sinks:
  clickhouse:
    url: http://clickhouse.logs:8123
    database: logs
    table: unified_log
```

---
layout: section
sectionNum: '05'
routeAlias: install
---

# Установка

Из GitHub, без npm

---
layout: default
---

# Установка

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

Slidev разворачивает `r3code-tech` в имя пакета `slidev-theme-r3code-tech`
и находит его в `node_modules`.

---
layout: end
logo: true
routeAlias: questions
---

# Вопросы?

<div class="text-2xl mt-8">
  <p>Дмитрий Синявский</p>
  <p class="text-xl opacity-70 mt-4">SRE</p>
  <p class="text-xl mt-4">t.me/letitkit</p>
</div>

<!--
Финальный слайд. Логотип в правом нижнем углу, номер слайда скрыт.
-->
