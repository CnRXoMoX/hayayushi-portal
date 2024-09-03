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
                var query = @"INSERT INTO users_attendance_total (userid, enddate, startdate, totalMinutes, totalSales)
                            SELECT
                                u.userid,
                                @endDate AS enddate,
                                @startDate AS startdate,
                                IFNULL(SUM(TIMESTAMPDIFF(MINUTE, a.clockin, COALESCE(a.clockout, CURRENT_TIMESTAMP()))), 0) AS totalMinutes,
                                IFNULL(SUM(s.totalsale), 0) AS totalSales
                            FROM
                                users AS u
                            LEFT JOIN users_attandance AS a
                                ON u.userid = a.userid
                                AND DATE(a.clockin) BETWEEN @startDate AND @endDate
                            LEFT JOIN user_sales AS s
                                ON u.userid = s.userid
                                AND DATE(s.saledate) BETWEEN @startDate AND @endDate
                            GROUP BY
                                u.userid, @endDate, @startDate
                            ON DUPLICATE KEY UPDATE
                                totalMinutes = VALUES(totalMinutes),
                                totalSales = VALUES(totalSales);";
                var results = connection.QueryAsync(query, qparams).GetAwaiter().GetResult();
                return Ok();
            }
        }
    }
}
