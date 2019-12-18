import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

export default class Pacientes extends Component{

    constructor() {
        super();
        this.state = {
            Medicos: [],
            medicoEscolhido: '',
            Pacientes: [],
        }
    }

    componentDidMount () {
        this.carregarMedicos();
    }

    atualizaIdDoutorEscolhido = (event) => {
        this.setState({ medicoEscolhido: event.target.value });
    }

    carregarMedicos = () => {
        Axios.get('http://localhost:5000/api/doutores')
            .then(data => {
                this.setState({Medicos: data.data});
            })
            .catch(erro => {
                console.log(erro);
            });
    };

    carregarPacientes = (event) => {
        event.preventDefault();
        Axios.get('http://localhost:5000/api/pacientes/' + this.state.medicoEscolhido)
            .then(data => {
                this.setState({Pacientes: data.data});
            })
            .catch(erro => {
                console.log(erro);
            });
    };

    getParsedDate(date){
        date = String(date).split('T');
        var days = String(date[0]).split('-');
        return [parseInt(days[2]),"/", parseInt(days[1]),"/", parseInt(days[0])];
    }

    render () {
        return (
            <div className="Pacientes">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
                <div id="container-pacientes">
                    <Link className="botoes" to="/">
                        <div>
                            <p>Dashboard</p>
                        </div>
                    </Link>
                    <div id="form-generos-pai">
                        <h3>Filtre um paciente:</h3>
                        <div>
                            <form>
                                <div className="form-group div-form">
                                        <select className="form-control"  value={this.state.medicoEscolhido} onChange={this.atualizaIdDoutorEscolhido}>
                                            <option value='' selected disabled>Selecione um Médico</option>
                                            {this.state.Medicos.map(element => {
                                                return(  
                                                    <option value={element.idDoutor}>{element.nome}</option>
                                                    )
                                                })}
                                        </select>
                                    <button className="btn btn-dark" onClick={this.carregarPacientes} id="submit" type="submit">Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="tabela-pacientes-pai">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Data de Nascimento</th>
                                    <th>CPF</th>
                                    <th>Nome Médico</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Pacientes.map(element => {
                                    return(  
                                        <tr>
                                            <td>{element.idPaciente}</td>
                                            <td>{element.nome}</td>
                                            <td>{this.getParsedDate(element.dataNascimento)}</td>
                                            <td>{element.cpf}</td>
                                            <td>{element.idDoutorNavigation != undefined ? element.idDoutorNavigation.nome : 'Não possui doutor cadastrado.'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}