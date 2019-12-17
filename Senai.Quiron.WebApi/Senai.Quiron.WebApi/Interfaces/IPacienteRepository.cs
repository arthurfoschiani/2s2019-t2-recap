using Senai.Quiron.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Quiron.WebApi.Interfaces
{
    public interface IPacienteRepository
    {
        List<Pacientes> Listar();
        void Cadastrar(Pacientes pacientes);
        void Atualizar(Pacientes pacientes);
        void Deletar(int id);
        Pacientes BuscarPorId(int id);
    }
}
