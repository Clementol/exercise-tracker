import {ApolloClient, InMemoryCache} from 'apollo-boost';
import fetch from 'node-fetch';
import {createHttpLink} from 'apollo-link-http'
// import {InMemoryCache} from 'apollo-cache-inmemory';


const client  = new ApolloClient({
     link: createHttpLink({
      uri: 'http://localhost:5700/graphql',
      fetch: fetch
     }),
    //uri: process.env.API_URL,
    fetch: fetch,
     cache: new InMemoryCache()
  })

  export default client;
