# ❗️ `apollo-link-response-resolver` is unmaintained. ❗️

I'm no longer of the opinion that this library is useful. The GraphQL layer is a UI concern and queries should be purpose-specific and driven by the UI's needs, so the data it returns should be in the format the UI expects. There should be no need for `apollo-link-response-resolver.

With that said, my opinion isn't necessarily true for everyone, so if you're is interested in maintaining `apollo-link-response-resolver`, please [reply to this issue](https://github.com/with-heart/apollo-link-response-resolver/issues/18)!

# [apollo-link-response-resolver](https://github.com/lionize/apollo-link-response-resolver)

### Automatically format incoming GraphQL query data with Apollo Client

Remote data from an external API doesn't always line up with the format we expect it to be in. From enum values not corresponding to their client-side string representation to float values not being return as a currency string, there are many cases where you need to automatically format incoming data.

`apollo-link-response-resolver` is a solution to this problem using a resolver format that GraphQL and Redux users will be comfortable with. You create your resolvers map and hook `apollo-link-response-resolver` in to ApolloClient and the rest is automatic--all incoming response data will be formatted based on the resolvers you provided.

## Quick Start

To get started, install `apollo-link-response-resolver` from npm:

`npm install -S apollo-link-response-resolver`

The rest of the instructions assume that you have already [set up Apollo Client](https://github.com/apollographql/apollo-link-state/blob/master/docs/react/basics/setup.html#installation) in your application. After you install the package, you can create your response resolver by calling `responseResolver` and passing in a resolver map. A resolver map describes how to update the fields on each type of data.

Let's look at a simple example where we're updating the `fullname` field on all pieces of data coming from the server with the `Account` type:

```javascript
import { withResponseResolver } from 'apollo-link-response-resolver'

const resolvers = {
  Account: {
    fullname: name => name.toUpperCase(),
  },
}

const responseResolverLink = withResponseResolver(resolvers)
```

To hook up your response resolvers to Apollo Client, add your link to the other links in your Apollo Link chain. You want to make sure that your link comes before `HttpLink`.

```javascript
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([responseResolverLink, new HttpLink()]),
})
```

## Example Application

TODO
