import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Medicos from './pages/Medicos/Medicos';
import Pacientes from './pages/Pacientes/Pacientes';
import FiltrarPorMedico from './pages/FiltrarPorMedico/FiltrarPorMedico';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/medicos' component={Medicos}/>
                <Route path='/filtrar' component={FiltrarPorMedico}/>
                <Route path='/pacientes' component={Pacientes}/>
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
