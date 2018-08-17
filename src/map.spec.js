import map from './map'

describe('map', () => {
  it('returns data if no maps or no data', () => {
    expect(map({}, null)).toEqual(null)
    expect(map(null, {})).toEqual({})
  })

  it('maps multiple typenames', () => {
    const maps = {
      Account: {fullname: name => name.toUpperCase()},
      Post: {title: title => title.toLowerCase()},
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

  it('maps a shallow nested object', () => {
    const maps = {
      Account: {fullname: name => name.toUpperCase()},
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

  it('maps a deeply nested object', () => {
    const maps = {
      Account: {fullname: name => name.toUpperCase()},
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

  it('maps nested objects and arrays', () => {
    const maps = {
      Account: {
        fullname: name => name.toUpperCase(),
        tags: tags => tags.map(t => t.toUpperCase()),
      },
    }
    const data = {
      someAccounts: {
        mainAccount: {
          fullname: 'Rob',
          secondaryAccount: {
            fullname: 'John',
            __typename: 'Account',
          },
          tags: ['a', 'b', 'c'],
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
          secondaryAccount: {
            fullname: 'JOHN',
            __typename: 'Account',
          },
          tags: ['A', 'B', 'C'],
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

  it("leaves all data that isn't mapped", () => {
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

  it('handles nested array with null value', () => {
    const maps = {
      Account: {
        fullname: name => name.toUpperCase(),
      },
    }
    const data = {
      items: [null, {fullname: 'Mark', __typename: 'Account'}],
    }
    const expected = {
      items: [null, {fullname: 'MARK', __typename: 'Account'}],
    }

    expect(map(maps, data)).toEqual(expected)
  })

  it('handles nested types', () => {
    const maps = {
      User: {
        firstname: name => name.toUpperCase(),
        lastname: name => name.toUpperCase(),
      },
      Company: {
        name: name => name.toUpperCase(),
      },
    }
    const data = {
      currentUser: {
        firstname: 'David',
        lastname: 'Felix',
        email: 'dfelix@test.com',
        company: {
          name: 'myCompany',
          __typename: 'Company',
        },
        __typename: 'User',
      },
    }
    const expected = {
      currentUser: {
        firstname: 'DAVID',
        lastname: 'FELIX',
        email: 'dfelix@test.com',
        company: {
          name: 'MYCOMPANY',
          __typename: 'Company',
        },
        __typename: 'User',
      },
    }

    expect(map(maps, data)).toEqual(expected)
  })
})
