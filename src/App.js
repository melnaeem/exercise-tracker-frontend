import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Navbar from './components/navbar.component';

import ExercisesList from './components/exercises-list.component';
import ExerciseForm from './components/exercise-form.component';
import CreateUser from './components/create-user.component';

const routerComponents = [
  { component: ExercisesList, path: '/', exact: true },
  { component: ExercisesList, path: '/exercises/list', exact: true },

  { component: ExerciseForm, path: '/exercises/:type', exact: true },
  { component: ExerciseForm, path: '/exercises/:type/:id'},

  { component: CreateUser, path: '/user/create' }
];

function App() {

  return (
    <Router>
      <Navbar />

      <div className="container py-5">
        <main className="mx-auto">
          <Switch>
            {routerComponents.map((router, i) => (
              <Route key={router.component.name + i} path={router.path} exact={router.exact} component={router.component} />
            ))}
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
