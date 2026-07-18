const QUERY_KEY_PATTERN = /^[A-Za-z0-9_.~-]$/
const READABLE_VALUE_PATTERN = /^[\p{L}\p{N}_.~-]$/u

const strictEncodeURIComponent = (value) =>
  encodeURIComponent(value).replace(/[!'()*]/g, (char) =>
    `%${char.charCodeAt(0).toString(16).toUpperCase()}`
  )

export const encodeReadableQueryValue = (value) =>
  Array.from(String(value).normalize('NFC')).map((char) => {
    if (char === ' ') return '+'
    if (READABLE_VALUE_PATTERN.test(char)) return char
    return strictEncodeURIComponent(char)
  }).join('')

export const buildReadableQueryString = (params) =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => {
      const encodedKey = Array.from(String(key)).map((char) => (
        QUERY_KEY_PATTERN.test(char) ? char : strictEncodeURIComponent(char)
      )).join('')

      return `${encodedKey}=${encodeReadableQueryValue(value)}`
    })
    .join('&')

export const normalizeInvitationParamValue = (value) => {
  if (!value) return ''

  let normalizedValue = value

  for (let index = 0; index < 2; index += 1) {
    if (!/%[0-9A-Fa-f]{2}/.test(normalizedValue)) break

    try {
      const decodedValue = decodeURIComponent(normalizedValue)
      if (decodedValue === normalizedValue) break
      normalizedValue = decodedValue
    } catch {
      break
    }
  }

  return normalizedValue.normalize('NFC')
}

export const getInvitationParam = (searchParams, ...keys) => {
  const value = keys.map((key) => searchParams.get(key)).find(Boolean)
  return normalizeInvitationParamValue(value)
}
