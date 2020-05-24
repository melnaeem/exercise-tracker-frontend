import React, { Component } from 'react';

import axios from 'axios';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class ExerciseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
      currentUserId: this.props.match.params.id,
      type: this.props.match.params.type
    }

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {

    this.state.type === 'edit' &&
      this.state.currentUserId &&
      this.getExerciseById(this.state.currentUserId).then(() => this.getUsers());

    this.getUsers();
  }

  getExerciseById(id) {
    return axios.get('https://tranquil-ravine-81570.herokuapp.com/exercises/' + id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })
      })
      .catch((error) => console.log(error));
  }

  getUsers() {
    return axios.get('https://tranquil-ravine-81570.herokuapp.com/users/')
      .then(response => {
        if (response.data.length > 0) {
          const users = response.data.map(user => user.username);
          this.setState({
            users: users,
            username: this.state.username ? this.state.username : users[0]
          });
        }
      })
      .catch((error) => console.log(error));
  }

  addExercise(exercise) {
    return axios.post('https://tranquil-ravine-81570.herokuapp.com/exercises/add', exercise)
      .then(res => console.log(res.data)).catch(error => console.log(error));
  }

  updateExercise(id, exercise) {
    return axios.post('https://tranquil-ravine-81570.herokuapp.com/exercises/update/' + id, exercise)
      .then(res => console.log(res.data));
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    const submitPromise = this.state.type === 'edit' ?
      this.updateExercise(this.state.currentUserId, exercise) :
      this.addExercise(exercise);

    submitPromise.then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <div>
        <h3>{`${this.state.type} Exercise`}</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref={React.createRef("userInput")}
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function (user) {
                  return <option
                    key={user}
                    value={user}>{user}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">{`${this.state.type} Exercise`}</button>
          </div>
        </form>
      </div>
    )
  }
}