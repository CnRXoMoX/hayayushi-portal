using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hayayushi_job_portal_api.Controllers.Payroll
{
    [Route("api/Payroll/[controller]")]
    [ApiController]
    public class Attendance : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] Constants.UsersAttendanceTotalInput usersAttendance)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var qparams = new
                {
                    endDate = usersAttendance.enddate,
                    startDate = usersAttendance.startdate
                };
                var query = @"INSERT INTO users_attendance_total (userid, enddate, startdate, totalMinutes)
                                SELECT
                                    userid,
                                    @endDate AS enddate,
                                    @startDate AS startdate,
                                    CAST(SUM(IFNULL(TIMESTAMPDIFF(MINUTE, clockin, COALESCE(clockout, CURRENT_TIMESTAMP())), 0)) AS INT) AS totalMinutes
                                FROM
                                    users_attandance
                                WHERE
                                    DATE_FORMAT(clockin, '%Y-%m-%d') BETWEEN @startDate AND @endDate
                                GROUP BY
                                    userid
                                ON DUPLICATE KEY UPDATE
                                    totalMinutes = VALUES(totalMinutes);";
                var results = connection.QueryAsync(query, qparams).GetAwaiter().GetResult();
                return Ok();
            }
        }
    }
}
