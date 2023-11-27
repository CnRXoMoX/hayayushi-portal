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
    public class ResetUserPassword : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Constants.PKFetchUsername user)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);
            string password = GeneratePassword();

            using (connection)
            {
                var qparams = new
                {
                    password = BCrypt.Net.BCrypt.HashPassword(password),
                    pk = user.pk
                };
                var query = "UPDATE users SET password = @password WHERE pk = @pk";

                int nRows = await connection.ExecuteAsync(query, qparams);

                if (nRows < 1)
                {
                    return BadRequest();
                }
                else
                {
                    return Ok(password);
                }
            }
        }

        private static string GeneratePassword()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 30).Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
