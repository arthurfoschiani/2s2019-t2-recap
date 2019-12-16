using Senai.Quiron.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Quiron.WebApi.Interfaces
{
    public interface IDoutorRepository
    {
        List<Doutores> Listar();
        void Cadastrar(Doutores doutores);
        void Deletar(int id);
    }
}
