import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/navbar.component';

import ExercisesList from './components/exercises-list.component';
import EditExercise from './components/edit-exercise.component';
import CreateExercise from './components/create-exercise.component';
import CreateUser from './components/create-user.component';


const routerComponents = [
  { component: ExercisesList, path: '/' },
  { component: EditExercise, path: '/edit/:id' },
  { component: CreateExercise, path: '/create' },
  { component: CreateUser, path: '/user' }
];

function App() {

  return (
    <Router>
      <Navbar />

      <div className="container py-5">
        <main className="mx-auto">
          {routerComponents.map(router => (
            <Route key={router.component.name} path={router.path} exact={router.path === '/'} component={router.component} />
          ))}
        </main>
      </div>
    </Router>
  );
}

export default App;
