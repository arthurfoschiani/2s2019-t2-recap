import React, {Component} from 'react';
import './Pacientes.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';

export default class Pacientes extends Component{

    constructor(){
        super();
        this.state = {
            lista: [],
            medicos: [],
            mensagem: '',
            mensagemSucesso: '',
            tituloForm: 'Cadastrar',
            id: '',
            nome: '', 
            dataNascimento: '',
            cpf: '',
            idDoutorEscolhido: ''
        };
    }

    componentDidMount(){
        this.listaAtualizadaPacientes();
        this.listaAtualizadaMedicos();
    }

    atualizaId = (event) => {
        this.setState({ id: event.target.value });
    }
    atualizaNome = (event) => {
        this.setState({ nome: event.target.value });
    }
    atualizaDataNascimento = (event) => {
        this.setState({ dataNascimento: event.target.value });
    }
    atualizaCpf = (event) => {
        this.setState({ cpf: event.target.value });
    } 
    atualizaIdDoutorEscolhido = (event) => {
        this.setState({ idDoutorEscolhido: event.target.value });
    }


    listaAtualizadaPacientes = () => {
        Axios.get('http://localhost:5000/api/pacientes')
            .then(data => {
                this.setState({lista: data.data});
            })
            .catch(erro => {
                console.log(erro);
            });
    }

    listaAtualizadaMedicos = () => {
        Axios.get('http://localhost:5000/api/doutores')
            .then(data => {
                this.setState({medicos: data.data});
            })
            .catch(erro => {
                console.log(erro);
            });
    }

    verificacao = (event) => {
        event.preventDefault()
        if (this.state.nome === ''|| this.state.dataNascimento === '' || this.state.cpf === '') {
            this.setState({mensagem: 'Não foi possível concluir o cadastro. Algum campo está vazio.'})
        } else {
            this.confereMetodo();
        }
    }

    confereMetodo() {
        if (this.state.id === null || this.state.id === '') {
            this.adicionarItem()
        } else {
            this.atualizarItem()
        }
    }

    adicionarItem = () => {
        this.setState({mensagemSucesso: 'O Cadastro foi concluído com sucesso'})
        Axios.post('http://localhost:5000/api/pacientes', {
            nome: this.state.nome,
            dataNascimento: this.state.dataNascimento,
            cpf: this.state.cpf,
            idDoutor: this.state.idDoutorEscolhido
        })
            .then(e => this.listaAtualizadaPacientes())
            .catch(error => console.log(error))
        this.limparForm()
    }

    atualizarItem = () => {
        this.setState({mensagemSucesso: 'A Atualização foi concluída com sucesso'})
        Axios.put('http://localhost:5000/api/pacientes', {
            idPaciente: this.state.id,
            nome: this.state.nome,
            dataNascimento: this.state.dataNascimento,
            cpf: this.state.cpf,
            idDoutor: this.state.idDoutorEscolhido
        })
            .then(e => this.listaAtualizadaPacientes())
            .catch(error => console.log(error))
    }

    deletarPaciente = (element) => {
        Axios.delete('http://localhost:5000/api/pacientes/' + element)
            .then(e => this.listaAtualizadaPacientes())
            .catch(error => console.log(error))
        this.setState({mensagemSucesso: 'O Médico foi deletado com sucesso'})
    }

    completarForm = (element) => {
        this.setState({ tituloForm: "Atualizar" });
        this.setState({ id: element.idPaciente });
        this.setState({ nome: element.nome });
        this.setState({ dataNascimento: element.dataNascimento });
        this.setState({ cpf: element.cpf });
        this.setState({ idDoutorEscolhido: element.idDoutor });
        this.setState({mensagem: ''});
        this.setState({mensagemSucesso: ''});
    }

    limparId = (event) => {
        event.preventDefault();
        this.setState({ tituloForm: "Cadastrar" });
        this.setState({ id: '' });
        this.setState({ nome: '' });
        this.setState({ dataNascimento: '' });
        this.setState({ cpf: '' });
        this.setState({ idDoutorEscolhido: '' });
        this.setState({mensagem: ''});
        this.setState({mensagemSucesso: ''});
    }

    limparForm = () => {
        this.setState({ tituloForm: "Cadastrar" });
        this.setState({ id: '' });
        this.setState({ nome: '' });
        this.setState({ dataNascimento: '' });
        this.setState({ cpf: '' });
        this.setState({ idDoutorEscolhido: '' });
    }
    
    getParsedDate(date){
        date = String(date).split('T');
        var days = String(date[0]).split('-');
        return [parseInt(days[2]),"/", parseInt(days[1]),"/", parseInt(days[0])];
    }

    render(){
        return(
            <div className="Pacientes">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
                <div id="container-pacientes">
                    <Link className="botoes" to="/">
                        <div>
                            <p>Dashboard</p>
                        </div>
                    </Link>
                    <div id="form-generos-pai">
                        <h3>{this.state.tituloForm} um Paciente:</h3>
                        <div>
                            <form>
                                <div className="form-group div-form">
                                    {this.state.id === "" ? <div></div> : <div id="div-escondida"><p>id: {this.state.id}</p><button className="btn btn-dark"  id="btn-habilitar-cadastro" onClick={this.limparId.bind(this)}>Habilitar cadastro</button></div>}
                                    <input className="form-control" id="nome" type="text" placeholder="Nome" value={this.state.nome} onChange={this.atualizaNome} />
                                    <input className="form-control" id="dataNascimento" type="date" placeholder="Data de Nascimento" value={this.state.dataNascimento} onChange={this.atualizaDataNascimento} />
                                    <input className="form-control" id="cpf" type="text" placeholder="CPF" value={this.state.cpf} onChange={this.atualizaCpf} />
                                    <select className="form-control"  value={this.state.idDoutorEscolhido} onChange={this.atualizaIdDoutorEscolhido}>
                                        <option value={null} selected disabled>Selecione um Médico</option>
                                        <option value=''>Não possui doutor</option>
                                        {this.state.medicos.map(element => {
                                            return(  
                                                <option value={element.idDoutor}>{element.nome}</option>
                                                )
                                            })}
                                    </select>
                                    <button className="btn btn-dark" onClick={this.verificacao.bind(this)} id="submit" type="submit">enviar</button>
                                </div>
                            </form>
                            <p 
                                className="text__login" 
                                style={{color: "red", textAlign: "center"}}>
                                {this.state.mensagem}
                            </p>
                            <p 
                                className="text__login" 
                                style={{color: "green", textAlign: "center"}}>
                                {this.state.mensagemSucesso}
                            </p>
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
                                {this.state.lista.map(element => {
                                    return(  
                                        <tr>
                                            <td>{element.idPaciente}</td>
                                            <td>{element.nome}</td>
                                            <td>{this.getParsedDate(element.dataNascimento)}</td>
                                            <td>{element.cpf}</td>
                                            <td>{element.idDoutorNavigation != undefined ? element.idDoutorNavigation.nome : 'Não possui doutor cadastrado.'}</td>
                                            <td><button className="btn btn-dark" onClick={() => this.completarForm(element)} type="submit">atualizar</button></td>
                                            <td><button className="btn btn-dark" onClick={() => this.deletarPaciente(element.idPaciente)} type="submit">deletar</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}