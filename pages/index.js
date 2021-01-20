import React from 'react';
import fetch from 'isomorphic-unfetch'
//Component
import ExerciseList from '../components/ExerciseList';
import client from '../utils/apollo';



const Home = (props) =>  {
    console.log(props.users);
    return (
            <ExerciseList />   
    )
}

// Home.getInitialProps = async () => {
//     const result = await fetch('http://localhost:3000/api/users', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//           }
//         });
//     const usersData = await result.json()
//     return  {
//         users:usersData
//     }
// }

export default Home;
