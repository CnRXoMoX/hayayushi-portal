using Dapper;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hayayushi_job_portal_api
{
    public class DatabaseTables
    {
        public static void UsersTable()
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                connection.Open();

                string createTableQuery = @"
                CREATE TABLE IF NOT EXISTS `users` (
                  `userid` int(11) NOT NULL,
                  `username` varchar(24) NOT NULL,
                  `password` char(60) NOT NULL,
                  `role` varchar(24) NOT NULL DEFAULT 'Kitchen Porter',
                  `pk` varchar(60) NOT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

                connection.Execute(createTableQuery);

                Console.WriteLine("Created UsersTable");
            }
        }

        public static void UsersAttendanceTable()
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                connection.Open();

                string createTableQuery = @"
                CREATE TABLE IF NOT EXISTS `users_attandance` (
                  `attendanceid` int(11) NOT NULL,
                  `userid` int(11) NOT NULL,
                  `clockin` datetime NOT NULL DEFAULT current_timestamp(),
                  `clockout` datetime DEFAULT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

                connection.Execute(createTableQuery);

                Console.WriteLine("Created UsersAttendance Table");
            }
        }

        public static void UsersAttendanceTotalTable()
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                connection.Open();

                string createTableQuery = @"
                CREATE TABLE IF NOT EXISTS `users_attendance_total` (
                  `userid` int(11) NOT NULL,
                  `date` datetime NOT NULL DEFAULT current_timestamp(),
                  `totalMinutes` int(11) NOT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

                connection.Execute(createTableQuery);

                Console.WriteLine("Created UsersAttendanceTotal Table");
            }
        }
    }
}
