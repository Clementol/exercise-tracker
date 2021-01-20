import React, {Component} from 'react';
// import Link from 'next/link'
import {useRouter} from 'next/router'
import {useQuery} from '@apollo/react-hooks'
// import {compose} from 'redux'
import {graphql, Mutation} from 'react-apollo'
import {getExerciseListQuery, deleteExerciseMutation}  from '../queries/queries'

const Exercise = (props) => {
    const id = props.exercise.id
    const router = useRouter()
    return (
        <Mutation mutation={deleteExerciseMutation} variables={{id}} refetchQueries={[{query: getExerciseListQuery}]}>
            {
                (deleteExercise) => (
            <tr>
                <td>{props.exercise.username}</td>
                <td>{props.exercise.description}</td>
                <td>{props.exercise.duration}</td>
                <td>{props.exercise.date.substring(0, 10)}</td>
                <td>
                    <i onClick={() => { router.push('/edit/[id]', `/edit/${id}`) } }
                         className="fa fa-pencil-square-o" style={{cursor: 'pointer'}} ></i> | &nbsp;
                    <i className="fa fa-trash" onClick={deleteExercise} style={{cursor: 'pointer'}} > </i> 
                </td>
        </tr>
        )}
        
        </Mutation>
    )
}

const ExerciseList = () => {
    
    //Query to load list of exercises
    const {loading, data, ...others} = useQuery(getExerciseListQuery) 
    
    //Mutation to delete exercises
    
    const displayExercise = () => {
        
        if (loading) {
           return ( <tr><td>Loading ...</td></tr>)
             
        } else {
            return data.exercises.map( exercise => {
                return <Exercise key={exercise.id} exercise={exercise} />
            })
        }
    }
        return (
            <div className="container">
                <h3>Logged Exercises</h3>
                <table className="table ">
                    <thead className="thead-light">
                        <tr>
                            <th >Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                        <tbody className="">
                            {displayExercise()}
                        </tbody>                       
                </table>
            </div>
        )
    
}

export default ExerciseList;
