import React, {Component} from 'react';
import './Dashboard.css';
import {Link} from 'react-router-dom';

export default class Dashboard extends Component{
    render(){
        return(
            <div className="Dashboard">
                <div id="container-dashboardadm">
                    <div id="textos-header">
                        <h2>Seja Bem Vindo(a)</h2>
                        <p>Aqui estão suas guias de acesso.</p>
                    </div>
                    <div id="botoes-direcionamento">
                        <div id="botoes-dashboard-esquerda">
                            <Link className="botoes" to="/medicos">
                                <div>
                                    <p>Médicos</p>
                                </div>
                            </Link>
                            <Link className="botoes" to="/pacientes">
                                <div>
                                    <p>Pacientes</p>
                                </div>
                            </Link>
                            <Link className="botoes" to="/filtrar">
                                <div>
                                    <p>Filtrar</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}