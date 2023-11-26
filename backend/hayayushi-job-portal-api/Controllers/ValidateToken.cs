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
    public class ValidateToken : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Constants.UserTokenValidate token)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);
            using (connection)
            {
                var qparams = new
                {
                    pk = token.nameid
                };

                var query = "SELECT * FROM users WHERE pk = @pk";

                var data = await connection.QueryFirstOrDefaultAsync<Constants.Users>(query, qparams);

                if (data != null)
                {
                    if (token.role != data.role)
                    {
                        return BadRequest("Data Not Matched.");
                    }

                    return Ok();
                }
                else
                {
                    return BadRequest("No Nameid Data.");
                }
            }
        }
    }
}
