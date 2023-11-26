using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace hayayushi_job_portal_api
{
    public class AuthService
    {
        public ClaimsPrincipal ValidateJwtToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Constants.JWT_KEY);

            try
            {
                var claimsPrincipal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = Constants.JWT_ISSUER,
                    ValidAudience = Constants.JWT_AUDIENCE,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                }, out var securityToken);
                return claimsPrincipal;
            }
            catch
            {
                return null;
            }
        }
    }
}
