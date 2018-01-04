import { map, mapFields } from '../utils'

describe('mapFields', () => {
  test('maps fields for a type', () => {
    const map = {
      fullname: name => name.toUpperCase(),
      amount: amount => amount + 1,
    }
    const data = {
      fullname: 'Homer Simpson',
      amount: 10,
    }
    const expected = {
      fullname: 'HOMER SIMPSON',
      amount: 11,
    }
    expect(mapFields(map, data)).toEqual(expected)
  })

  test('passes through fields with no map function', () => {
    const map = {}
    const data = {
      fullname: 'Homer Simpson',
    }
    expect(mapFields(map, data)).toEqual(data)
  })
})

describe('map', () => {
  test('maps multiple typenames', () => {
    const maps = {
      Account: { fullname: name => name.toUpperCase() },
      Post: { title: title => title.toLowerCase() },
    }
    const data = {
      accounts: [
        {
          fullname: 'John',
          __typename: 'Account',
        },
      ],
      posts: [
        {
          title: 'Holy Batman',
          __typename: 'Post',
        },
      ],
    }
    const expected = {
      accounts: [
        {
          fullname: 'JOHN',
          __typename: 'Account',
        },
      ],
      posts: [
        {
          title: 'holy batman',
          __typename: 'Post',
        },
      ],
    }

    expect(map(maps, data)).toEqual(expected)
  })

  test('maps a shallow nested object', () => {
    const maps = {
      Account: { fullname: name => name.toUpperCase() },
    }
    const data = {
      allAccounts: {
        fullname: 'Homer Simpson',
        __typename: 'Account',
      },
    }
    const expected = {
      allAccounts: {
        fullname: 'HOMER SIMPSON',
        __typename: 'Account',
      },
    }

    expect(map(maps, data)).toEqual(expected)
  })

  test('maps a deeply nested object', () => {
    const maps = {
      Account: { fullname: name => name.toUpperCase() },
    }
    const data = {
      someAccounts: {
        moreAccounts: {
          nested: {
            fullname: 'Jason',
            __typename: 'Account',
          },
        },
      },
    }
    const expected = {
      someAccounts: {
        moreAccounts: {
          nested: {
            fullname: 'JASON',
            __typename: 'Account',
          },
        },
      },
    }

    expect(map(maps, data)).toEqual(expected)
  })

  test('maps nested objects and arrays', () => {
    const maps = {
      Account: { fullname: name => name.toUpperCase() },
    }
    const data = {
      someAccounts: {
        mainAccount: {
          fullname: 'Rob',
          __typename: 'Account',
        },
        otherAccounts: [
          {
            fullname: 'David',
            __typename: 'Account',
          },
        ],
      },
    }
    const expected = {
      someAccounts: {
        mainAccount: {
          fullname: 'ROB',
          __typename: 'Account',
        },
        otherAccounts: [
          {
            fullname: 'DAVID',
            __typename: 'Account',
          },
        ],
      },
    }

    expect(map(maps, data)).toEqual(expected)
  })

  test("leaves all data that isn't mapped", () => {
    const maps = {
      Account: {
        fullname: name => name.toUpperCase(),
      },
    }
    const data = {
      someAccounts: [
        {
          fullname: 'Curtis',
          dob: '12/24/91',
          gender: 'm',
          __typename: 'Account',
        },
      ],
    }
    const expected = {
      someAccounts: [
        {
          fullname: 'CURTIS',
          dob: '12/24/91',
          gender: 'm',
          __typename: 'Account',
        },
      ],
    }

    expect(map(maps, data)).toEqual(expected)
  })

  test('handles null being passed as data', () => {
    const maps = {
      Account: {
        fullname: name => name.toUpperCase(),
      },
    }
    const data = null

    expect(map(maps, data)).toEqual(null)
  })

  test('handles nested array with null value', () => {
    const maps = {
      Account: {
        fullname: name => name.toUpperCase(),
      },
    }
    const data = {
      items: [null, { fullname: 'Mark', __typename: 'Account' }],
    }
    const expected = {
      items: [null, { fullname: 'MARK', __typename: 'Account' }],
    }

    expect(map(maps, data)).toEqual(expected)
  })

  test('handles nested object key with null value', () => {
    const maps = {
      Account: {
        fullname: name => name.toUpperCase(),
      },
    }
    const data = {
      items: null,
    }

    expect(map(maps, data)).toEqual(data)
  })
})
