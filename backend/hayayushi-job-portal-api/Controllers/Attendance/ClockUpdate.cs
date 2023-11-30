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
    public class ClockUpdate : ControllerBase
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

                var query = "SELECT * FROM users_attandance WHERE userid = @userid ORDER BY clockin DESC LIMIT 1";

                var results = await connection.QueryFirstOrDefaultAsync<Constants.ClockRecord>(query, qparams);

                if (results != null)
                {
                    return Ok(results);
                }
                else
                {
                    return NotFound("No Results!");
                }
            }
        }
    }
}
