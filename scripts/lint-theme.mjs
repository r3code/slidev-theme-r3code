#!/usr/bin/env node
// ─── r3code-tech: линтер структуры темы ────────────────────────────────────
// Проверяет что все обязательные файлы темы на месте и структура корректна.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

let errors = 0
let warnings = 0

function error(msg) {
  console.error(`  ✗ ${msg}`)
  errors++
}

function warn(msg) {
  console.warn(`  ⚠ ${msg}`)
  warnings++
}

function checkExists(path, label) {
  if (!existsSync(join(root, path)))
    error(`${label || path} — не найден: ${path}`)
}

function checkDir(path, label) {
  const full = join(root, path)
  if (!existsSync(full)) {
    error(`${label || path} — директория не найдена: ${path}`)
    return []
  }
  if (!statSync(full).isDirectory()) {
    error(`${label || path} — не директория: ${path}`)
    return []
  }
  return readdirSync(full)
}

console.log('── Lint r3code-tech theme ──────────────────────────────')

// ── package.json ──────────────────────────────────────────────────────────
checkExists('package.json', 'package.json')
if (existsSync(join(root, 'package.json'))) {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'))

  if (!pkg.name?.startsWith('slidev-theme-'))
    error(`package.json: name должен начинаться с "slidev-theme-", сейчас "${pkg.name}"`)

  if (!pkg.keywords?.includes('slidev-theme'))
    error('package.json: keywords должен содержать "slidev-theme"')

  if (!pkg.keywords?.includes('slidev'))
    error('package.json: keywords должен содержать "slidev"')

  if (!pkg.slidev)
    error('package.json: отсутствует поле "slidev"')

  if (pkg.slidev && !['light', 'dark', 'both'].includes(pkg.slidev.colorSchema))
    error(`package.json: slidev.colorSchema должен быть "light", "dark" или "both"`)

  if (!pkg.files || !Array.isArray(pkg.files))
    error('package.json: отсутствует поле "files"')

  console.log(`  ✓ package.json: name=${pkg.name}, colorSchema=${pkg.slidev?.colorSchema}`)
}

// ── Обязательные директории ───────────────────────────────────────────────
const layouts = checkDir('layouts', 'layouts/')
const components = checkDir('components', 'components/')
const styles = checkDir('styles', 'styles/')
const setup = checkDir('setup', 'setup/')
checkDir('public', 'public/')

// ── styles/index.ts ───────────────────────────────────────────────────────
checkExists('styles/index.ts', 'styles/index.ts (точка входа стилей)')

// ── Минимальный набор layouts ─────────────────────────────────────────────
const requiredLayouts = ['cover.vue', 'default.vue', 'end.vue', 'section.vue']
for (const layout of requiredLayouts) {
  if (!layouts.includes(layout))
    error(`layouts/${layout} — обязательный layout не найден`)
}
console.log(`  ✓ layouts/: ${layouts.length} файлов`)

// ── Минимальный набор компонентов ─────────────────────────────────────────
const requiredComponents = ['SlideNumber.vue']
for (const comp of requiredComponents) {
  if (!components.includes(comp))
    error(`components/${comp} — обязательный компонент не найден`)
}
console.log(`  ✓ components/: ${components.length} файлов`)

// ── setup/shiki.ts ────────────────────────────────────────────────────────
if (!setup.includes('shiki.ts'))
  warn('setup/shiki.ts не найден — будет использована тема shiki по умолчанию')

// ── example.md (demo колода) ──────────────────────────────────────────────
checkExists('example.md', 'example.md (demo колода)')

// ── LICENSE ───────────────────────────────────────────────────────────────
checkExists('LICENSE', 'LICENSE')

// ── README.md ─────────────────────────────────────────────────────────────
checkExists('README.md', 'README.md')

// ── uno.config.ts ─────────────────────────────────────────────────────────
checkExists('uno.config.ts', 'uno.config.ts')

// ── Итог ──────────────────────────────────────────────────────────────────
console.log('')
console.log(`Errors:   ${errors}`)
console.log(`Warnings: ${warnings}`)

if (errors > 0) {
  console.log('')
  console.log('✗ Линтер нашёл ошибки')
  process.exit(1)
}

console.log('')
console.log('✓ Линтер прошёл без ошибок')
