import {gql} from 'apollo-boost'

const getExerciseListQuery = gql`
    {
        exercises {
            id
            username
            description
            duration
            date
        }
    }
`
const addUserMutation = gql`
  mutation($username: String!) {
    addUser(username: $username ) {
        id
        username
    }
  }
`

const addExerciseMutation = gql`
  mutation($username: String!, $description: String!, $duration: Int!, $date: String!) {
    addExercise(username: $username, description: $description, duration: $duration, date: $date ) {
        id
        username
        description
        duration
        date
    }
  }
`

const getUsersQuery = gql`
  {
    users {
        id
        username
    }
  }
`
const getExerciseQuery = gql`
  query($id: ID!) {
    exercise(id: $id) {
      id
      username
      description
      duration
      date
    }
  }
`

const updateExerciseMutation = gql`
  mutation($id: ID!, $username: String!, $description: String!, $duration: Int!, $date: String! ) {
    updateExercise(id: $id,username: $username, description:
    $description, duration: $duration, date: $date) {
    id
    username
    description
    duration
    date
  }

  }
`

const deleteExerciseMutation = gql`
  mutation($id: ID!) {
    deleteExercise(id: $id){
      id
      username
    }
  }
`


export {getExerciseListQuery, addUserMutation,
   addExerciseMutation, getUsersQuery, deleteExerciseMutation, getExerciseQuery, updateExerciseMutation};