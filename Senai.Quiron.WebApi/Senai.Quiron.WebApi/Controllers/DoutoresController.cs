using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.Quiron.WebApi.Domains;
using Senai.Quiron.WebApi.Interfaces;
using Senai.Quiron.WebApi.Repositories;

namespace Senai.Quiron.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class DoutoresController : ControllerBase
    {
        private IDoutorRepository DoutorRepository { get; set; }

        public DoutoresController()
        {
            DoutorRepository = new DoutorRepository();
        }

        [HttpPut]
        public IActionResult Atualizar(Doutores doutor)
        {
            try
            {
                Doutores DoutorBuscado = DoutorRepository.BuscarPorId(doutor.IdDoutor);
                if (DoutorBuscado == null)
                    return NotFound();

                DoutorRepository.Atualizar(doutor);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(DoutorRepository.Listar());
        }

        [HttpPost]
        public IActionResult Cadastrar(Doutores doutores)
        {
            try
            {
                DoutorRepository.Cadastrar(doutores);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Ocorreu um erro: " + ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            DoutorRepository.Deletar(id);
            return Ok();
        }
    }
}