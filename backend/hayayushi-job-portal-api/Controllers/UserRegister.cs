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
    public class UserRegister : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Constants.UserPost user)
        {
            if(await CheckAccountUsername(user))
            {
                return NotFound("User is already registered");
            }

            int userid = await CreateAccount(user);

            if(userid == -1)
            {
                return NotFound("An error occured");
            }

            return Ok("User has been created!");
        }

        private static string GenerateRandomPK()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 30).Select(s => s[random.Next(s.Length)]).ToArray());
        }

        private async Task<string> GetUserPK()
        {
            string randomPK = GenerateRandomPK();
            var connection = new MySqlConnection(Constants.dbConnectionString);
            using (connection)
            {
                var qparams = new
                {
                    pk = randomPK
                };

                var query = "SELECT * FROM users WHERE pk = @pk";

                var nRows = await connection.QueryFirstOrDefaultAsync<int>(query, qparams);

                if (nRows >= 1)
                {
                    return await GetUserPK();
                }
                else
                {
                    return randomPK;
                }
            }
        }

        private async Task<int> CreateAccount(Constants.UserPost user)
        {
            try
            {
                var connection = new MySqlConnection(Constants.dbConnectionString);

                using (connection)
                {
                    var qparams = new
                    {
                        name = user.username,
                        password = BCrypt.Net.BCrypt.HashPassword(user.password),
                        pk = await GetUserPK()
                    };

                    Console.WriteLine(qparams.pk);
                    var query = "INSERT INTO users (username, password, pk) VALUES (@name, @password, @pk); SELECT LAST_INSERT_ID()";

                    int nRows = await connection.QueryFirstOrDefaultAsync<int>(query, qparams);

                    if (nRows < 1)
                    {
                        return -1;
                    }
                    else
                    {
                        Console.WriteLine(nRows);
                        return nRows;
                    }
                }
            }
            catch (Exception err)
            {
                Console.WriteLine(err);
                return -1;
            }
        }

        private async Task<bool> CheckAccountUsername(Constants.UserPost user)
        {
            try
            {
                var connection = new MySqlConnection(Constants.dbConnectionString);

                using (connection)
                {
                    var qparams = new
                    {
                        username = user.username
                    };

                    var query = "SELECT * FROM users WHERE username = @username";

                    int nRows = await connection.QueryFirstOrDefaultAsync<int>(query, qparams);

                    if (nRows >= 1)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }

                }
            }
            catch (Exception err)
            {
                Console.WriteLine(err);
                return false;
            }
        }
    }
}
