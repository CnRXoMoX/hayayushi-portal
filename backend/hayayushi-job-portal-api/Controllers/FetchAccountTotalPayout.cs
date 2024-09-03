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
    public class FetchAccountTotalPayout : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Constants.UserAccountTotalPayout user)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var qparams = new
                {
                    userid = user.UserID
                };

                var query = "SELECT SUM(totalMinutes) AS totalMinutes, SUM(totalSales) AS totalSales FROM users_attendance_total WHERE isClaimed = 0 AND userid = @userid";

                var data = await connection.QueryFirstOrDefaultAsync<Constants.UserAccountTotalPayoutRes>(query, qparams);

                if (data != null)
                {
                    return Ok(data);
                }
                return NotFound("No user found");
            }
        }
    }
}
