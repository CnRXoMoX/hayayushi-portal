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
    public class FetchAccountStats : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Constants.UserAccountStats user)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var qparams = new
                {
                    userid = user.UserID,
                    date = await GetLatestDate()
                };

                var query = "SELECT DISTINCT player.userid as userid, player.username as username, player.role as rank, DATE_FORMAT(aTotal.enddate, '%M %e, %Y') AS formattedDate, aTotal.totalMinutes, aTotal.totalSales, aTotal.isClaimed FROM users as player JOIN users_attendance_total as aTotal ON aTotal.userid = player.userid WHERE DATE(aTotal.enddate) = STR_TO_DATE(@date, '%M %e, %Y') AND player.pk = @userid";

                var data = await connection.QueryFirstOrDefaultAsync<Constants.UserAccountStatsRes>(query, qparams);

                if (data != null)
                {
                    return Ok(data);
                }
                return NotFound("No user found");
            }
        }

        private static async Task<String> GetLatestDate()
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var query = "SELECT DATE_FORMAT(MAX(enddate), '%M %e, %Y') AS formattedDate FROM users_attendance_total";
                var data = (await connection.QueryAsync<string>(query)).FirstOrDefault();

                if (data != null)
                {
                    return data;
                }
                return null;
            }
        }
    }
}
