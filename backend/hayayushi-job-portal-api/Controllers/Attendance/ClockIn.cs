using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hayayushi_job_portal_api.Controllers.Attendance
{
    [Route("api/Attendance/[controller]")]
    [ApiController]
    public class ClockIn : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Constants.Users user)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var qparams = new
                {
                    userid = user.userid
                };
                var query = "INSERT INTO users_attandance (userid) VALUES (@userid)";

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
