import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './views/Home';
import Stats from './views/Stats';
import history from './history';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert/dist/sweetalert.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './assets/css/style.css';
import './assets/css/icons.css';
import './assets/custom.css';

console.log('   sdsads Test');
function App() {
  return (
    <Router history={history}>
      <ToastContainer />
      <Switch>
        <Route path='/stats/' name='Statistics' component={Stats} />
        <Route path='/' name='Home' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
