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
    public class UserChangePassword : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Constants.UserPost user)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var qparams = new
                {
                    username = user.username,
                    password = BCrypt.Net.BCrypt.HashPassword(user.password)
                };
                var query = "UPDATE users SET password = @password WHERE username = @username";

                int nRows = await connection.ExecuteAsync(query, qparams);

                if (nRows < 1)
                {
                    return BadRequest();
                }
                else
                {
                    return Ok();
                }
            }
        }
    }
}
