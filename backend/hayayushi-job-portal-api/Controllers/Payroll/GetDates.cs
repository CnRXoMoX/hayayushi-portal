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
    public class GetDates : ControllerBase
    {
        [HttpPost]
        public IActionResult Post()
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {

                var query = "SELECT DATE_FORMAT(enddate, '%M %e, %Y') AS formattedDate FROM users_attendance_total GROUP BY DATE(enddate);";
                var results = connection.QueryAsync(query).GetAwaiter().GetResult();
                return Ok(results);
            }
        }
    }
}
