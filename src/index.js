import { ApolloLink, Observable } from 'apollo-link'
import { mapFields, map } from './utils'

export const withResponseResolver = maps => {
  return new ApolloLink((operation, forward) => {
    return new Observable(observer => {
      let sub

      try {
        sub = forward(operation).subscribe({
          next: result => {
            const mapped = map(maps, result.data)
            result.data = mapped

            observer.next(result)
          },
          error: error => {
            console.error(error)
          },
          complete: observer.complete.bind(observer),
        })
      } catch (e) {
        observer.error(e)
      }

      return () => {
        if (sub) sub.unsubscribe()
      }
    })
  })
}
