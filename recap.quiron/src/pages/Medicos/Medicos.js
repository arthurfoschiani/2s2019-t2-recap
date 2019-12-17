import React, {Component} from 'react';
import './Medicos.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';

export default class Medicos extends Component{

    constructor(){
        super();
        this.state = {
            lista: [],
            mensagem: '',
            mensagemSucesso: '',
            tituloForm: 'Cadastrar',
            id: '',
            nome: '', 
            crm: '',
            crmUf: '',
        };
    }

    componentDidMount(){
        this.listaAtualizadaMedicos();
    }

    atualizaId = (event) => {
        this.setState({ id: event.target.value });
    }
    atualizaNome = (event) => {
        this.setState({ nome: event.target.value });
    }
    atualizaCrm = (event) => {
        this.setState({ crm: event.target.value });
    }
    atualizaCrmUf = (event) => {
        this.setState({ crmUf: event.target.value });
    }


    listaAtualizadaMedicos = () => {
        Axios.get('http://localhost:5000/api/doutores')
            .then(data => {
                this.setState({lista: data.data});
            })
            .catch(erro => {
                console.log(erro);
            });
    }

    verificacao = (event) => {
        event.preventDefault()
        if (this.state.nome === ''|| this.state.crm === '' || this.state.crmUf === '') {
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
        Axios.post('http://localhost:5000/api/doutores', {
            nome: this.state.nome,
            crm: this.state.crm,
            crmUf: this.state.crmUf
        })
            .then(e => this.listaAtualizadaMedicos())
            .catch(error => console.log(error))
        this.limparForm()
    }

    atualizarItem = () => {
        this.setState({mensagemSucesso: 'A Atualização foi concluída com sucesso'})
        Axios.put('http://localhost:5000/api/doutores', {
            idDoutor: this.state.id,
            nome: this.state.nome,
            crm: this.state.crm,
            crmUf: this.state.crmUf
        })
            .then(e => this.listaAtualizadaMedicos())
            .catch(error => console.log(error))
    }

    deletarMedico = (element) => {
        Axios.delete('http://localhost:5000/api/doutores/' + element)
            .then(e => this.listaAtualizadaMedicos())
            .catch(error => console.log(error))
        this.setState({mensagemSucesso: 'O Médico foi deletado com sucesso'})
    }

    completarForm = (element) => {
        this.setState({ tituloForm: "Atualizar" });
        this.setState({ id: element.idDoutor });
        this.setState({ nome: element.nome });
        this.setState({ crm: element.crm });
        this.setState({ crmUf: element.crmUf });
        this.setState({mensagem: ''});
        this.setState({mensagemSucesso: ''});
    }

    limparId = (event) => {
        event.preventDefault();
        this.setState({ tituloForm: "Cadastrar" });
        this.setState({ id: '' });
        this.setState({ nome: '' });
        this.setState({ crm: '' });
        this.setState({ crmUf: '' });
        this.setState({mensagem: ''});
        this.setState({mensagemSucesso: ''});
    }

    limparForm = () => {
        this.setState({ tituloForm: "Cadastrar" });
        this.setState({ id: '' });
        this.setState({ nome: '' });
        this.setState({ crm: '' });
        this.setState({ crmUf: '' });
    }

    render(){
        return(
            <div className="Medicos">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
                <div id="container-medicos">
                    <Link className="botoes" to="/">
                        <div>
                            <p>Dashboard</p>
                        </div>
                    </Link>
                    <div id="form-medicos-pai">
                        <h3>{this.state.tituloForm} um Médico:</h3>
                        <div>
                            <form>
                                <div className="form-group div-form">
                                    {this.state.id === "" ? <div></div> : <div id="div-escondida"><p>Id: {this.state.id}</p><button className="btn btn-dark" id="btn-habilitar-cadastro" onClick={this.limparId.bind(this)}>Habilitar cadastro</button></div>}
                                    <input className="form-control" id="nome" type="text" placeholder="nome" value={this.state.nome} onChange={this.atualizaNome} />
                                    <input className="form-control" id="crm" type="text" placeholder="crm" value={this.state.crm} onChange={this.atualizaCrm} />
                                    <input className="form-control" id="crmUf" type="text" placeholder="crmUf" value={this.state.crmUf} onChange={this.atualizaCrmUf} />
                                    <button className="btn btn-dark" onClick={this.verificacao.bind(this)} id="submit" type="submit">Enviar</button>
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
                    <div id="tabela-lancamentos-pai">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>CRM</th>
                                    <th>CRMUF</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.lista.map(element => {
                                    return(  
                                        <tr>
                                            <td>{element.idDoutor}</td>
                                            <td>{element.nome}</td>
                                            <td>{element.crm}</td>
                                            <td>{element.crmUf}</td>
                                            <td><button className="btn btn-dark" onClick={() => this.completarForm(element)} type="submit">Atualizar</button></td>
                                            <td><button className="btn btn-dark" onClick={() => this.deletarMedico(element.idDoutor)} type="submit">Deletar</button></td>
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