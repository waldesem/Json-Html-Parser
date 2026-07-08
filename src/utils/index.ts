import { schema } from '@/schema'
import {
  Data,
  Conditions,
  Schemas,
  Items,
  Education,
  Expirience,
  Names,
  Organizations,
} from '@/types'

export function createTable(data: Data & Conditions, fields: Schemas[] = schema) {
  let html = ''

  for (const field of fields) {
    if (field.items && field.label) {
      html += parseConditions(data[field.key as keyof Conditions], field.items, field.label)
      continue
    }

    if (field.keys) {
      const values = field.keys.map((key: keyof Data) => data[key])
      if (field.tag === 'caption') html += `<caption>${values.join(' ')}</caption>`

      if (field.tag === 'thead')
        html += `<tr><th class='text-uppercase' colspan='2'>${values.join(' ')}</th></tr>`
      continue
    }

    if (!field.key) html += `<tr><th colspan='2'>${field.label}</th></tr>`
    else html += createRow(data[field.key as keyof Data], field)
  }
  return "<table class='table caption-top'>" + html + '</table>'
}

function parseConditions(
  datas: Expirience[] | Education[] | Names[] | Organizations[],
  fields: Items[],
  label: string,
) {
  if (!datas.length) return ''

  let html = `<tr><th colspan='2'>${label}</th></tr>`
  for (const data of datas) {
    for (const field of fields) {
      html += createRow(data[field.key as keyof typeof data], field)
    }
  }
  return html
}

function createRow(value: string | undefined, field: Schemas | Items) {
  if (value) {
    const formatter = field.foo ?? ((v: string) => v)
    const row: string = formatter(value)
    if (row) {
      return `<tr><td>${field.label}</td><td ${field.attr ?? ''}>${row}</td></tr>`
    }
  }
  return ''
}

export function localStr(str: string) {
  try {
    return str ? new Date(str).toLocaleDateString() : ''
  } catch {
    return ''
  }
}
