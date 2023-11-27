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
    public class DeleteUserAccount : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Constants.PKFetchUsername user)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var qparams = new
                {
                    pk = user.pk
                };
                var query = "DELETE FROM users WHERE pk = @pk";

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
