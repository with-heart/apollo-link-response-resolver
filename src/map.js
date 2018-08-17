import {isArray, isObject, isMappedType} from './utils'

const mapArray = (maps, data) => data.map(x => map(maps, x))

const mapTypedObject = (maps, data) => {
  const typeMap = maps[data.__typename]

  return Object.entries(data).reduce((acc, [key, value]) => {
    if (typeMap[key]) {
      acc[key] = typeMap[key](value)
    } else {
      acc[key] = map(maps, value)
    }

    return acc
  }, {})
}

const mapObject = (maps, data) => {
  if (isMappedType(maps, data)) {
    return mapTypedObject(maps, data)
  }

  return Object.entries(data).reduce((acc, [key, value]) => {
    acc[key] = map(maps, value)

    return acc
  }, {})
}

const map = (maps, data) => {
  if (isArray(data)) return mapArray(maps, data)
  if (isObject(data)) return mapObject(maps, data)

  return data
}

export default map
