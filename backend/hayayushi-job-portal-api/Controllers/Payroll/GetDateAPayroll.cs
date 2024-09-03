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
    public class GetDateAPayroll : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] Constants.GetDateAPayroll dateAPayroll)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var qparams = new
                {
                    date = dateAPayroll.date
                };

                var query = "SELECT DISTINCT CONCAT(player.userid, '_', DATE_FORMAT(aTotal.enddate, '%Y%m%d')) as uid, player.userid as id, player.username as username, player.role as rank, aTotal.totalMinutes, aTotal.totalSales, aTotal.isClaimed FROM users as player JOIN users_attendance_total as aTotal ON player.userid = aTotal.userid WHERE DATE(aTotal.enddate) = STR_TO_DATE(@date, '%M %e, %Y')";
                var results = connection.QueryAsync(query, qparams).GetAwaiter().GetResult();
                return Ok(results);
            }
        }
    }
}
