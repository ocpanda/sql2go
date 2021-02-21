export const convertCase = (value) => {
  return _convertCase(value, new WeakMap())
}
function _convertCase (value, cache) {
  const representingType = Object.prototype.toString.call(value)
  
  if (representingType !== '[object Array]' && representingType !== '[object Object]') return value

  if (cache.has(value)) return cache.get(value)

  const clone = representingType === '[object Array]' ? [] : {}
  cache.set(value, clone)

  for (const key of Object.keys(value)) {
    clone[convertCamelCase(key)] = _convertCase(value[key], cache)
  }

  return clone
}
function convertCamelCase (str) {
  return str
    .replace(/([A-Z][a-z]+)/g, '_$1')
    .replace(/([A-Z]+)/g, '_$1')
    .replace(/[^_\w]+/g, '_')
    .replace(/[A-Za-z]+/g, s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .replace(/_/g, '')
    .replace(/^[A-Z]/g, s => s.toLowerCase())  
}