#!/usr/bin/env node
// ─── r3code-tech: проверка контрастности WCAG AA ───────────────────────────
// Адаптировано из slidev-theme-bear/scripts/check-contrast.mjs
//
// Читает styles/vars.css, резолвит var(...)-ссылки и считает WCAG contrast
// ratio для пар «цвет / фон». Падает с кодом 1, если хоть одна пара ниже AA.
//
// Для r3code-tech тема простая: чёрный текст на белом фоне.
// Проверяем:
//   - основной текст / фон (4.5:1)
//   - текст на разделителе bg-black (4.5:1)
//   - код / фон кода (4.5:1)
//
//   node scripts/check-contrast.mjs

import { readFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const AA_NORMAL = 4.5 // обычный текст (WCAG 1.4.3)

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const cssPath = resolve(root, 'styles/vars.css')

if (!existsSync(cssPath)) {
  console.error(`✗ styles/vars.css не найден`)
  process.exit(1)
}

const css = readFileSync(cssPath, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')

function parseBlock(selector) {
  const re = new RegExp(`${selector.replace(/\./g, '\\.')}\\s*\\{([^}]*)\}`, 's')
  const body = css.match(re)?.[1] ?? ''
  const vars = {}
  for (const m of body.matchAll(/(--[\w-]+)\s*:([^;]+);/g))
    vars[m[1].trim()] = m[2].trim()
  return vars
}

const rootVars = parseBlock(':root')
const darkVars = { ...rootVars, ...parseBlock('html.dark') }

function resolveColor(value, vars) {
  let v = value.trim()
  let guard = 0
  while (v.startsWith('var(') && guard++ < 10) {
    const name = v.slice(4, v.indexOf(')')).trim()
    v = (vars[name] ?? rootVars[name] ?? '').trim()
  }
  return v
}

function toRgb(hex) {
  const h = hex.replace('#', '')
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  return [0, 2, 4].map(i => Number.parseInt(n.slice(i, i + 2), 16))
}

function relLuminance(hex) {
  const [r, g, b] = toRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(fg, bg) {
  const l1 = relLuminance(fg)
  const l2 = relLuminance(bg)
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}

// Текстовые пары для r3code-tech
const pairs = [
  // Светлая тема
  ['--vi-text', '#ffffff', 'основной текст / фон страницы (light)', rootVars],
  ['--vi-text', '--vi-code-bg', 'основной текст / фон кода (light)', rootVars],
  ['--vi-text-on-dark', '#000000', 'текст на разделителе / чёрный фон (light)', rootVars],
  ['--vi-version-color', '#ffffff', 'версия / фон страницы (light)', rootVars],
  // Тёмная тема
  ['--vi-text', '#000000', 'основной текст / фон страницы (dark)', darkVars],
  ['--vi-text', '--vi-code-bg', 'основной текст / фон кода (dark)', darkVars],
  ['--vi-text-on-dark', '#ffffff', 'текст на разделителе / белый фон (dark)', darkVars],
  ['--vi-version-color', '#000000', 'версия / фон страницы (dark)', darkVars],
]

let failed = 0

console.log('── WCAG AA Contrast Check ──────────────────────────────')
for (const [fgTok, bgTok, label, vars] of pairs) {
  const fg = fgTok.startsWith('--') ? resolveColor(vars[fgTok], vars) : fgTok
  const bg = bgTok.startsWith('--') ? resolveColor(vars[bgTok], vars) : bgTok

  if (!/^#[0-9a-f]{3,6}$/i.test(fg) || !/^#[0-9a-f]{3,6}$/i.test(bg)) {
    console.log(`  ⚠ ${label}: не удалось резолвить (${fgTok}=${fg}, ${bgTok}=${bg})`)
    failed++
    continue
  }

  const ratio = contrast(fg, bg)
  const ok = ratio >= AA_NORMAL
  if (!ok)
    failed++
  console.log(
    `  ${ok ? '✓' : '✗'} ${label.padEnd(50)} ${fg} on ${bg}  ${ratio.toFixed(2)}:1`
    + `${ok ? '' : `  < ${AA_NORMAL} AA`}`,
  )
}

if (failed) {
  console.error(`\n✗ ${failed} пар(а) ниже WCAG AA. Правь styles/vars.css.`)
  process.exit(1)
}
console.log(`\n✓ Все пары ≥ WCAG AA (${AA_NORMAL}:1).`)
