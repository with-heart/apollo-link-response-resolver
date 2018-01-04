export const mapFields = (map, data) => {
  Object.keys(map).forEach(key => {
    if (data[key]) {
      data[key] = map[key](data[key])
    }
  })
  return data
}

const isObject = x => typeof x === 'object'
const isArray = x => Array.isArray(x)

export const map = (maps, data) => {
  const keys = Object.keys(maps)
  const isMappedType = x => x.__typename && keys.includes(x.__typename)
  const mapTypedObject = x => mapFields(maps[x.__typename], x)

  const mapObject = obj => {
    return Object.keys(obj).reduce((acc, key) => {
      const cur = obj[key]

      if (!cur) {
        acc[key] = cur
      } else if (isArray(cur)) {
        acc[key] = mapArray(cur)
      } else if (isObject(cur)) {
        if (isMappedType(cur)) {
          acc[key] = mapTypedObject(cur)
        } else {
          acc[key] = mapObject(cur)
        }
      } else {
        acc[key] = cur
      }
      return acc
    }, {})
  }

  const mapArray = array => {
    return array.map(o => {
      if (!o) {
        return o
      }

      if (isArray(o)) {
        return mapArray(o)
      }

      if (isObject(o)) {
        if (isMappedType(o)) {
          return mapTypedObject(o)
        }
        return mapObject(o)
      }

      return o
    })
  }

  if (!data) {
    return data
  }

  if (isObject(data)) {
    if (isMappedType(data)) {
      return mapTypedObject(data)
    }
    return mapObject(data)
  }

  return data
}
