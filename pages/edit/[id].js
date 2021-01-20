import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import {compose} from 'redux'
import DatePicker from 'react-datepicker';
import {updateExerciseMutation, getUsersQuery, getExerciseListQuery, getExerciseQuery} from '../../queries/queries';
import Router from 'next/router';

class EditExercise extends Component {
   
    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

      //dynamic routing Id of the exercise to update
        this.id = this.props.query.id
        console.log(this.id)
        
        //states
        this.state = {
            username: '',
            description: '',
            duration: Number,
            date: new Date()
        }
        
    }
    getData() {
        this.props.getExerciseQuery({
            variables: {
                id: this.id
            }
        })
    }
    
    
    // Prefill the inputs with exercise data to update
    displayUsers ()  {
        const {loading, users} = this.props.getUsersQuery
        if (loading) {
            return (<option disabled>Loading Users</option>)
        } else {
            return users.map( (user) => {
                return ( 
                    
                    <option key={user.id}
                            value={user.username}>
                            {user.username}
                    </option>)
            } )
        }
    }
    onChangeUsername (e) {
        this.setState({username: e.target.value})
    }

    onChangeDescription (e) {
       this.setState({description: e.target.value})
    }

    onChangeDuration (e) {
        this.setState({duration : parseInt(e.target.value)})
    }

    onChangeDate (date) {
        this.setState({date: date})
    }

    onSubmit (event) {
        //const {id} = Router.query
        event.preventDefault();
       
        this.props.updateExerciseMutation({
            variables: {
                id: this.id,
                username: this.state.username,
                description: this.state.description,
                duration: this.state.duration,
                date: this.state.date
            },
            refetchQueries: [{query: getExerciseListQuery}]
        })
        

        //window.location = '/'; //Go back home
        Router.push('/')
        
    }
        render() {
            console.log(this.props)
            return (
                <div className="container">
                <h3>Create New Exercise</h3>
                <form onSubmit={this.onSubmit}  >
                    <div className="form-group">
                        <label>Username: </label>
                        <select 
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                                <option>Select Username</option>
                                {this.displayUsers()}
                        </select>
                    </div>
                    <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription} />
                    </div>
                    <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type='number'
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration} />
                    </div>
                    <div className="form-group">
                    <label>Date: </label>
                        <div>
                            <DatePicker selected={this.state.date}
                                        onChange={this.onChangeDate}
                                        showTimeSelect
                                        timeFormat="P"
                                        dateFormat="Pp"
                                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit"
                                value="Update Exercise"
                                className="btn btn-primary"  />
                    </div>
                </form>
            </div>
         
        )
    }
}   
              

export default compose(
    graphql(getUsersQuery, {name: 'getUsersQuery'}),
    graphql(updateExerciseMutation, {name: 'updateExerciseMutation'}),
    graphql(getExerciseQuery,{ name: 'getExerciseQuery'}, {
        options: props => {
            return {
                variables: {
                    id: props.query.id
                }
            }
        }
    } )
) (EditExercise);
