import React from 'react';
import AddUser from '../components/AddUser'

// const client  = new ApolloClient({
//      link: createHttpLink({
//         uri: 'http://localhost:5700/graphql',
//         fetch: fetch
//    }),
//     fetch: fetch,
//      cache: new InMemoryCache()
//   })
  


const CreateUser = () =>  {
   
    return (
        <AddUser />
    )
    
}


export default CreateUser;
