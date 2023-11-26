using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hayayushi_job_portal_api
{
    public class Constants
    {
        public static string dbConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

        public static readonly string JWT_KEY = "0McYgujdfIhnYZ6kDl0fd0McYgujdfIhnYZ6kDl0f0McYgujdfIhnYZ6kDl0f";
        public static readonly string JWT_ISSUER = "https://localhost:5001/";
        public static readonly string JWT_AUDIENCE = "https://localhost:5001/";

        public class Users
        {
            public int userid { get; set; }
            public string username { get; set; }
            public string password { get; set; }
            public string role { get; set; }
            public string pk { get; set; }
        }

        public class PKFetchUsername
        {
            public string pk { get; set; }
        }

        public class UserPost
        {
            public string username { get; set; }
            public string password { get; set; }
        }

        public class UserTokenValidate
        {
            public string nameid { get; set; }
            public string role { get; set; }
        }
    }
}
