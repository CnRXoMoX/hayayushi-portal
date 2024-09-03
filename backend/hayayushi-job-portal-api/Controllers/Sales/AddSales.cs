using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hayayushi_job_portal_api.Controllers.Sales
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddSales : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Constants.UserSales user)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);
            using (connection)
            {
                var qparams = new
                {
                    userid = user.UserID,
                    salecontext = user.SaleContext,
                    totalsale = user.TotalSale
                };
                var query = "INSERT INTO user_sales (userid, saleContext, totalsale) VALUES (@userid, @salecontext, @totalsale)";

                int nRows = await connection.ExecuteAsync(query, qparams);

                if (nRows < 1)
                {
                    return BadRequest();
                }
                else
                {
                    return Ok();
                }
            }
        }
    }
}
