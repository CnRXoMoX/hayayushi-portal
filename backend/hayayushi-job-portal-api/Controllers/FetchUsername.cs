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
    public class FetchUsername : ControllerBase
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

                var query = "SELECT * FROM users WHERE pk = @pk";

                var data = await connection.QueryFirstOrDefaultAsync<Constants.Users>(query, qparams);

                if (data != null)
                {
                    return Ok(new { data.username });
                }
                return NotFound("No user found");
            }
        }
    }
}
