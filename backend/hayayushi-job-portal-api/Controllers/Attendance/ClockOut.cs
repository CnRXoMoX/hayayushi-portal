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
    public class ClockOut : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Constants.Users user)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);
            var attendanceID = await GetAttendanceID(user.userid);
            using (connection)
            {
                var qparams = new
                {
                    attendanceID = attendanceID
                };
                var query = "UPDATE users_attandance SET clockout = CURRENT_TIMESTAMP() WHERE attendanceid = @attendanceID";

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

        private async Task<int> GetAttendanceID(int userid)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var qparams = new
                {
                    userid = userid
                };

                var query = "SELECT * FROM users_attandance WHERE userid = @userid ORDER BY clockin DESC LIMIT 1";

                var results = await connection.QueryFirstOrDefaultAsync<Constants.ClockRecord>(query, qparams);

                if (results != null)
                {
                    return results.AttendanceId;
                }
                else
                {
                    return -1;
                }
            }
        }
    }
}
