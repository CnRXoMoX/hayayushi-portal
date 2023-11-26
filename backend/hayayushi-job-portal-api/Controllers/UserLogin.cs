using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;

namespace hayayushi_job_portal_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLogin : ControllerBase
    {
        private readonly IConfiguration _config;
        public UserLogin(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Constants.UserPost user)
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                var qparams = new
                {
                    name = user.username
                };

                var query = "SELECT * FROM users WHERE username = @name";

                var data = await connection.QueryFirstOrDefaultAsync<Constants.Users>(query, qparams);

                if(data != null)
                {
                    if(!BCrypt.Net.BCrypt.Verify(user.password, data.password))
                    {
                        return NotFound("Username and Password does not match.");
                    }

                    var token = GenerateToken(data);

                    Response.Cookies.Append("jwt", token, new CookieOptions
                    {
                        HttpOnly = true
                    });
                    return Ok(new { token, data.userid });
                }
                return NotFound("No user found");
            }
        }

        private string GenerateToken(Constants.Users user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Constants.JWT_KEY));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.pk),
                    new Claim(ClaimTypes.Role, user.role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = Constants.JWT_ISSUER,
                Audience = Constants.JWT_AUDIENCE,
                SigningCredentials = credentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
