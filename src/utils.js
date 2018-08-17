const is = x => x !== null && x !== undefined

const isObject = x => is(x) && !Array.isArray(x) && typeof x === 'object'

const isArray = x => is(x) && Array.isArray(x)

const keys = Object.keys

const isMappedType = (maps, object) =>
  object.__typename && Object.keys(maps).includes(object.__typename)

export {is, isObject, isArray, keys, isMappedType}
