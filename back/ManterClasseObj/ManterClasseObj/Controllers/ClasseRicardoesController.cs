#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManterClasseObj.Data;
using ManterClasseObj.Model;
using Serilog;

namespace ManterClasseObj.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClasseRicardoesController : ControllerBase
    {
        private readonly ManterClasseObjContext _context;

        public ClasseRicardoesController(ManterClasseObjContext context)
        {
            _context = context;
        }

        // GET: api/ClasseRicardoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClasseRicardo>>> GetClasseRicardo()
        {
            var res = from obj in _context.ClasseRicardo select obj;
            res = res.Where(x => x.Ativo == true);
            return await res.ToListAsync();
        }

        // GET: api/ClasseRicardoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClasseRicardo>> GetClasseRicardo(int id)
        {
            var classeRicardo = await _context.ClasseRicardo.FindAsync(id);

            if (classeRicardo == null)
            {
                return NotFound();
            }

            return classeRicardo;
        }

        // PUT: api/ClasseRicardoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClasseRicardo(int id, string descricao)
        {
            ClasseRicardo dado;
            if (id != 0)
            {
                dado = _context.ClasseRicardo.FirstOrDefault(x => x.Id == id);
                if (dado == null) return NotFound();
            }
            else
            {
                return BadRequest();
            }

            try
            {
                dado.Descricao = descricao;
                _context.ClasseRicardo.Update(dado);
                Log.Information("Registro atualizado com sucesso");
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClasseRicardoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> PutStatusClasseObjeto(int id, ClasseRicardo classeRicardo)
        {
            if (id != classeRicardo.Id)
            {
                return BadRequest();
            }
            _context.Entry(classeRicardo).State = EntityState.Modified;
            try
            {
                classeRicardo.Ativo = false;
                Log.Information("Registro ativo/inativo");
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClasseRicardoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        //[HttpPut("{id}/status")]
        //public async Task<IActionResult> PutClasseStatusRicardo(int id, ClasseRicardo classeRicardo)
        //{
        //    ClasseRicardo dado;
        //    if (id != 0)
        //    {
        //        dado = _context.ClasseRicardo.FirstOrDefault(x => x.Id == id);
        //        if (dado == null) return NotFound();
        //    }
        //    else
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(classeRicardo).State = EntityState.Modified;

        //    try
        //    {
        //        //dado.Ativo = !dado.Ativo;
        //        classeRicardo.Ativo = false;
        //        _context.ClasseRicardo.Update(classeRicardo);
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ClasseRicardoExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/ClasseRicardoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ClasseRicardo>> PostClasseRicardo(ClasseRicardo classeRicardo)
        {
            if (string.IsNullOrEmpty(classeRicardo.Descricao))
                return BadRequest("Necessário o preenchimento de descrição");

            if (!ValidaDescricao(classeRicardo.Id, classeRicardo.Descricao))
                return BadRequest("Classe do objeto cadastrada está inativa");

            _context.ClasseRicardo.Add(classeRicardo);

            Log.Information("Registro efetuado com sucesso");

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClasseRicardo", new { id = classeRicardo.Id }, classeRicardo);
        }

        // DELETE: api/ClasseRicardoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClasseRicardo(int id)
        {
            var classeRicardo = await _context.ClasseRicardo.FindAsync(id);
            if (classeRicardo == null)
            {
                return NotFound();
            }

            _context.ClasseRicardo.Remove(classeRicardo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClasseRicardoExists(int id)
        {
            return _context.ClasseRicardo.Any(e => e.Id == id);
        }

        private bool ValidaDescricao(int id, string descricao)
        {
            var result = from obj in _context.ClasseRicardo select obj;
            result = result.Where(x => x.Descricao == descricao).Where(x => x.Id != id);
            if (!result.Any())
                return true;
            return false;
        }
    }
}
