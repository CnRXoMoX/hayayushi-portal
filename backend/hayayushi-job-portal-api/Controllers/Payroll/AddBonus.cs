/*using Dapper;
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
    public class AddBonus : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] Constants.UserBonus userBonus)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var qparams = new
                {
                    userid = userBonus.UserID,
                    bonus = userBonus.Bonus
                };
                var query = @"INSERT INTO user_salary_bonus (userid, bonus) VALUES (@userid, @bonus)";
                var results = connection.QueryAsync(query, qparams).GetAwaiter().GetResult();
                return Ok();
            }
        }
    }
}*/
