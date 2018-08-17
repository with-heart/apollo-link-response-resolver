import {is, isObject, isArray, keys, isMappedType} from './utils'

test('is detects defined values', () => {
  expect(is('hi')).toBe(true)
  expect(is({})).toBe(true)
  expect(is([])).toBe(true)
  expect(is(null)).toBe(false)
  expect(is(undefined)).toBe(false)
})

test('isObject detects objects', () => {
  expect(isObject({})).toBe(true)
  expect(isObject([])).toBe(false)
  expect(isObject('hi')).toBe(false)
})

test('isArray detects arrays', () => {
  expect(isArray([])).toBe(true)
  expect(isArray({})).toBe(false)
})

test('keys returns object keys', () => {
  expect(keys({a: null, b: null})).toEqual(['a', 'b'])
})

test('isMappedType determines if provided object is represented in provided maps', () => {
  const maps = {
    Account: {
      fullname: () => '',
    },
  }
  const object = {
    fullname: 'Mark',
    __typename: 'Account',
  }
  expect(isMappedType(maps, object)).toBe(true)
})
