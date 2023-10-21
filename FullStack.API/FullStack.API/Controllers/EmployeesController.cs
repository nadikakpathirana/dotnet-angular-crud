using FullStack.API.Data;
using FullStack.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullStack.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public EmployeesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var empList = await _context.Employees.ToListAsync();
            return Ok(empList);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee ([FromBody]Employee employee)
        {
            employee.Id = Guid.NewGuid();

            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetEmployee([FromRoute] Guid id)
        {
            var emp = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);

            if (emp == null)
            {
                return NotFound();
            }

            return Ok(emp);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute]Guid id,[FromBody] Employee employee)
        {
            var emp = await _context.Employees.FindAsync(id);

            if (emp == null)
            {
                return NotFound();
            }

            emp.Name = employee.Name;
            emp.Email = employee.Email;
            emp.Salary = employee.Salary;
            emp.Phone = employee.Phone;
            emp.Department = employee.Department;

            await _context.SaveChangesAsync();

            return Ok(emp);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id) {
            var emp = await _context.Employees.FindAsync(id);

            if (emp == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(emp);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
