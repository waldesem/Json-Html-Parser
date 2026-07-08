export function localStr(str: string) {
  try {
    return str ? new Date(str).toLocaleDateString() : ''
  } catch {
    return ''
  }
}
