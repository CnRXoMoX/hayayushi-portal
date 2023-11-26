using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hayayushi_job_portal_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateUserAccount : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Constants.UpdateUser user)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var qparams = new
                {
                    name = user.username,
                    role = user.role,
                    pk = user.pk
                };
                var query = "UPDATE users SET username = @name, role = @role WHERE pk = @pk";

                int nRows = await connection.ExecuteAsync(query, qparams);

                if (nRows < 1)
                {
                    return BadRequest();
                }
                else
                {
                    return Ok(nRows);
                }
            }
        }
    }
}
