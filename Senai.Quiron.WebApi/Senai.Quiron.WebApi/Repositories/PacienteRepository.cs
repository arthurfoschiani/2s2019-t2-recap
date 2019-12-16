using Microsoft.EntityFrameworkCore;
using Senai.Quiron.WebApi.Domains;
using Senai.Quiron.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Quiron.WebApi.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        public void Cadastrar(Pacientes pacientes)
        {
            using (QuironContext ctx = new QuironContext())
            {
                ctx.Pacientes.Add(pacientes);
                ctx.SaveChanges();
            }
        }

        public void Deletar(int id)
        {
            using (QuironContext ctx = new QuironContext())
            {
                Pacientes pacienteBuscado = ctx.Pacientes.FirstOrDefault(x => x.IdPaciente == id);
                ctx.Pacientes.Remove(pacienteBuscado);
                ctx.SaveChanges();
            }
        }

        public List<Pacientes> Listar()
        {
            using (QuironContext ctx = new QuironContext())
            {
                return ctx.Pacientes.Include(x => x.IdDoutorNavigation).ToList();
            }
        }
    }
}
