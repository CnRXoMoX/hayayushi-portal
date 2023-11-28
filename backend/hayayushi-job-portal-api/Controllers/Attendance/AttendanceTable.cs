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
    public class AttendanceTable : ControllerBase
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

                var query = "SELECT " +
                                "DATE_FORMAT(clockin, '%Y-%m-%d %H:%i:%s') AS ClockIn, " +
                                "DATE_FORMAT(clockout, '%Y-%m-%d %H:%i:%s') AS ClockOut, " +
                                "TIMESTAMPDIFF(MINUTE, clockin, COALESCE(clockout, CURRENT_TIMESTAMP())) AS totalMinutes " +
                            "FROM " +
                                "users_attandance " +
                            "WHERE " +
                                "userid = @userid " +
                            "ORDER BY " +
                                "clockin DESC " +
                            "LIMIT 5";

                var results = await connection.QueryAsync(query, qparams);

                var query2 = "SELECT CAST(SUM(IFNULL(TIMESTAMPDIFF(MINUTE, clockin, COALESCE(clockout, CURRENT_TIMESTAMP())), 0)) AS INT) AS totalMinutes FROM users_attandance WHERE YEARWEEK(clockin, 1) = YEARWEEK(CURRENT_DATE(), 1) && userid = @userid";
                var totalMinutes = await connection.QueryAsync(query2, qparams);
                if (results != null)
                {
                    return Ok(new { Results = results, totalMinutes });
                }
                else
                {
                    return NotFound("No Results!");
                }
            }
        }
    }
}
