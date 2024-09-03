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
    [Route("api/[controller]")]
    [ApiController]
    public class ClaimPayroll : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] Constants.ClaimPayroll ClaimPayroll)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var qparams = new
                {
                    userid = ClaimPayroll.UserID,
                    date = ClaimPayroll.Date,
                    isClaimed = ClaimPayroll.Claimed
                };

                var query = @"UPDATE users_attendance_total SET isClaimed = @isClaimed WHERE userid = @userid && DATE(enddate) = STR_TO_DATE(@date, '%M %e, %Y')";
                var results = connection.QueryAsync(query, qparams).GetAwaiter().GetResult();
                return Ok();
            }
        }
    }
}
