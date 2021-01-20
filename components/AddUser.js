import React, {useState} from 'react';
import Router from 'next/router'
import {useQuery, Mutation} from 'react-apollo';


//Query
import {addUserMutation, getUsersQuery} from '../queries/queries'


function AddUser()  {
    //state
    const [username, setUserName] = useState('')
    

    const onChangeUsername = (e) => {
        setUserName(e.target.value)
    }

    // const onSubmit = (event) =>  {
    //     event.preventDefault();
    //     Router.push('/ExerciseList' )
    //     console.log(username)
    
    //     setUserName('')
    // }
        return (
            <Mutation mutation={addUserMutation} variables={{username}} refetchQueries={[{query: getUsersQuery}]}>
                {(addUser, {loading, error}) => (
                   
                     <div className="container">
                     <h3>Create New User</h3>
                     <form onSubmit={addUser}>
                         <div className="form-group">
                             <label>Username: </label>
                             <input
                                 type="text"
                                 className="form-control"
                                 value={username}
                                 onChange={onChangeUsername}
                             />
                         </div>
                         <div className="form-group">
                             <input type='submit' value="Submit" className="btn btn-primary" />
                         </div>
                     </form>
                 </div> 
                )}
               
            </Mutation>
        )
    
}

export default AddUser;
