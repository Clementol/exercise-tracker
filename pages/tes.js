import React, {useState} from 'react'
import DatePicker from 'react-datepicker';
import {updateExerciseMutation, getUsersQuery, getExerciseListQuery, getExerciseQuery} from '../../queries/queries';
import { Mutation} from 'react-apollo';
import {useQuery} from '@apollo/react-hooks';
import {useRouter} from 'next/router';

const EditExercise = ()=> {
   
    // dynamic routing
    const router = useRouter()
    const {id} = router.query //Id of the exercise to update
  
  
                                            // to update
   
    
    
    // State
    const [username, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState(new Date());

    // Prefill the inputs with exercise data to update
    
    
    const {loading, data} = useQuery(getUsersQuery); //Query to get All Users
    
    const displayUsers = () => {
        if (loading) {
            return (<option disabled>Loading Users</option>)
        } else {
            return data.users.map( (user) => {
                return ( 
                    
                    <option key={user.id}
                            value={user.username}>
                            {user.username}
                    </option>)
            } )
        }
    }
    const onChangeUsername = (e) => {
        setUserName(e.target.value)
    }

    const onChangeDescription = (e) => {
       setDescription(e.target.value)
    }

    const onChangeDuration = (e) => {
        setDuration(parseInt(e.target.value))
    }

    const onChangeDate = (date) => {
        setDate(date)
    }

    const onSubmit = (event) => {
        event.preventDefault();
       
        
        setUserName('')
        setDescription('')
        setDuration('')
        setDuration('')

        //window.location = '/'; //Go back home
        router.push('/')
        
    }
        // console.log(getExercise)
        return (
            <Mutation mutation={updateExerciseMutation} variables={{id, username, description,
            duration, date}} refetchQueries={[{query: getExerciseListQuery}]}>
            { (updateExercise, {loading, error}) => (
                <div className="container">
                <h3>Create New Exercise</h3>
                <form onSubmit={onSubmit} onClick={updateExercise}  >
                    <div className="form-group">
                        <label>Username: </label>
                        <select 
                                required
                                className="form-control"
                                value={username}
                                onChange={onChangeUsername}>
                                <option>Select Username</option>
                                {displayUsers()}
                        </select>
                    </div>
                    <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                            required
                            className="form-control"
                            value={description}
                            onChange={onChangeDescription} />
                    </div>
                    <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type='number'
                            required
                            className="form-control"
                            value={duration}
                            onChange={onChangeDuration} />
                    </div>
                    <div className="form-group">
                    <label>Date: </label>
                        <div>
                            <DatePicker selected={date}
                                        onChange={onChangeDate}
                                        showTimeSelect
                                        timeFormat="P"
                                        dateFormat="Pp"
                                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="Update"
                                value="Create Exercise Log"
                                className="btn btn-primary"  />
                    </div>
                </form>
            </div>

            )}
        </Mutation>
        )
    
}

export default EditExercise;
