using Senai.Quiron.WebApi.Domains;
using Senai.Quiron.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Quiron.WebApi.Repositories
{
    public class DoutorRepository : IDoutorRepository
    {
        public void Atualizar(Doutores doutores)
        {
            using (QuironContext ctx = new QuironContext())
            {
                Doutores doutorBuscado = ctx.Doutores.FirstOrDefault(x => x.IdDoutor == doutores.IdDoutor);
                doutorBuscado.Nome = doutores.Nome;
                doutorBuscado.Crm = doutores.Crm;
                doutorBuscado.CrmUf = doutores.CrmUf;
                ctx.Doutores.Update(doutorBuscado);
                ctx.SaveChanges();
            }
        }

        public void Cadastrar(Doutores doutores)
        {
            using (QuironContext ctx = new QuironContext())
            {
                ctx.Doutores.Add(doutores);
                ctx.SaveChanges();
            }
        }

        public void Deletar(int id)
        {
            using (QuironContext ctx = new QuironContext())
            {
                Doutores doutorBuscado = ctx.Doutores.FirstOrDefault(x => x.IdDoutor == id);
                ctx.Doutores.Remove(doutorBuscado);
                ctx.SaveChanges();
            }
        }

        public List<Doutores> Listar()
        {
            using (QuironContext ctx = new QuironContext())
            {
                return ctx.Doutores.ToList();
            }
        }

        public Doutores BuscarPorId(int id)
        {
            using (QuironContext ctx = new QuironContext())
            {
                return ctx.Doutores.FirstOrDefault(x => x.IdDoutor == id);
            }
        }
    }
}
