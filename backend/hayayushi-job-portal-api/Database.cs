using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hayayushi_job_portal_api
{
    public class Database
    {
        public static void UpdateDatabase()
        {
            DatabaseTables.UsersTable();
        }
    }
}
