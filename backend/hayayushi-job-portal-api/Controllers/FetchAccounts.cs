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
    public class FetchAccounts : ControllerBase
    {
        [HttpGet]
        public IActionResult Post(int page = 1)
        {
            var pageSize = 10;
            var offset = (page - 1) * pageSize;

            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var qparams = new
                {
                    PageSize = pageSize,
                    OffSet = offset
                };

                var query = "SELECT * FROM users LIMIT @PageSize OFFSET @offset";

                var results = connection.QueryAsync(query, qparams).GetAwaiter().GetResult();

                var countQuery = "SELECT COUNT(*) FROM users";
                var totalUsers = connection.ExecuteScalar<int>(countQuery);

                return Ok(new { Results = results, TotalUsers = totalUsers });
            }
        }
    }
}
