import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';

import axios from 'axios';


const Exercise = props => {
  const history = useHistory();
  return (
    <tr className="exercise" onClick={() => { history.push(`/exercises/edit/${props.exercise._id}`) }}>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link className="btn btn-primary px-1 py-0 mr-2" to={`/exercises/edit/${props.exercise._id}`}>edit</Link>
        <button className="btn btn-danger px-1 py-0" onClick={(e) => { props.deleteExercise(props.exercise._id, e) }}>delete</button>
      </td>
    </tr>
  )
}

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios.get('https://tranquil-ravine-81570.herokuapp.com/exercises/')
      .then(response => {
        let exerciseList = response.data;
        exerciseList = exerciseList.sort((exerciseA, exerciseB) => new Date(exerciseA.date) - new Date(exerciseB.date));
        this.setState({ exercises: exerciseList })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id, e) {
    e.stopPropagation();

    axios.delete('https://tranquil-ravine-81570.herokuapp.com/exercises/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.exerciseList()}
          </tbody>
        </table>
      </div>
    )
  }
}