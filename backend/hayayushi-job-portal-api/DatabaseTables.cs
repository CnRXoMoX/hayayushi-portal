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

                string addRootUser = @"
                INSERT INTO `users` (`userid`, `username`, `password`, `role`, `pk`) VALUES
                (2, 'Root', '$2a$11$evjprnzL/5gf3hMzkxwDqeV4GpUIV//gWj3TE15i7nDJ/.EFVQF/q', 'Manager', 'ILKW0R04BBGXYZAHCLYRJ3HST1EJG0');";

                connection.Execute(createTableQuery);
                connection.Execute(addRootUser);

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
                  `startdate` datetime NOT NULL DEFAULT current_timestamp(),
                  `enddate` datetime NOT NULL DEFAULT current_timestamp(),
                  `totalMinutes` int(11) NOT NULL,
                  `totalSales` int(11) NOT NULL,
                  `isClaimed` int(11) NOT NULL DEFAULT 0
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

                connection.Execute(createTableQuery);

                Console.WriteLine("Created UsersAttendanceTotal Table");
            }
        }

        public static void UserSalaryBonusTable()
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                connection.Open();

                string createTableQuery = @"
                CREATE TABLE IF NOT EXISTS `user_salary_bonus` (
                  `bonusid` int(11) NOT NULL,
                  `userid` int(11) NOT NULL,
                  `date` datetime NOT NULL DEFAULT current_timestamp(),
                  `bonus` int(11) NOT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

                connection.Execute(createTableQuery);
                Console.WriteLine("Created user_salary_bonus Table");
            }
        }

        public static void UserSalesTable()
        {
            var connection = new MySqlConnection(Constants.dbConnectionString);

            using (connection)
            {
                connection.Open();

                string createTableQuery = @"
                CREATE TABLE IF NOT EXISTS `user_sales` (
                  `saleid` int(11) NOT NULL,
                  `userid` int(11) NOT NULL,
                  `saledate` datetime NOT NULL DEFAULT current_timestamp(),
                  `totalsale` int(11) NOT NULL,
                  `saleContext` text NOT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

                connection.Execute(createTableQuery);

                Console.WriteLine("Created UserSales Table");
            }
        }
    }
}
