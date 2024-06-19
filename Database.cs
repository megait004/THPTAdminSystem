using System;
using System.IO;
using System.Data.SQLite;
using System.Text.Json;
using System.Collections.Generic;
namespace THPTAdminSystem
{
    internal class Database
    {
        private static string connectionString = "Data Source=database/database.db; Version = 3; New = True; Compress = True;";

        public void initDatabase()
        {
            if (!Directory.Exists("database"))
            {
                Directory.CreateDirectory("database");
            }
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                using (SQLiteCommand command = connection.CreateCommand())
                {
                    string InitializeDatabase =
                        @"
                        CREATE TABLE IF NOT EXISTS
                            Account (
                                NAME TEXT NOT NULL,
                                TYPE BOOL,
                                USERNAME TEXT UNIQUE NOT NULL,
                                PASSWORD TEXT NOT NULL,
                                PHONE_NUMBER CHAR(12)
                            );

                        CREATE TABLE IF NOT EXISTS
                            Score (
                                STUDENTID TEXT,
                                SUBJECT TEXT NOT NULL UNIQUE,
                                PASS BOOL,
                                SCORE INTEGER,
                                TYPE CHAR(10),
                                NOTE TEXT,
                                FOREIGN KEY (STUDENTID) REFERENCES ACCOUNT (USERNAME)
                            );

                        CREATE TABLE IF NOT EXISTS
                            Schedule (
                                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                SUBJECT1 TEXT,
                                SUBJECT2 TEXT,
                                SUBJECT3 TEXT,
                                SUBJECT4 TEXT,
                                SUBJECT5 TEXT
                            );
                        INSERT or IGNORE INTO
                            Account (NAME, TYPE, USERNAME, PASSWORD)
                        VALUES
                            ('Giap', 0, 'admin', 'admin');
                        INSERT or IGNORE INTO
                            Schedule (
                                ID,
                                SUBJECT1,
                                SUBJECT2,
                                SUBJECT3,
                                SUBJECT4,
                                SUBJECT5
                            )
                        VALUES
                            (2, '', '', '', '', ''),
                            (3, '', '', '', '', ''),
                            (4, '', '', '', '', ''),
                            (5, '', '', '', '', ''),
                            (6, '', '', '', '', ''),
                            (7, '', '', '', '', '');
                    ";
                    command.CommandText = InitializeDatabase;
                    command.ExecuteNonQuery();
                }
                connection.Close();
            }
        }

        public string Login(string username, string password)
        {
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                using (SQLiteCommand command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM Account WHERE USERNAME = @username AND PASSWORD = @password";
                    command.Parameters.AddWithValue("@username", username);
                    command.Parameters.AddWithValue("@password", password);
                    using (SQLiteDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            connection.Close();
                            return "Đăng nhập thành công";
                        }
                        else
                        {
                            connection.Close();
                            return "Đăng nhập thất bại";
                        }
                    }
                }
            }
        }

        public string GetInfo(string username)
        {
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                using (SQLiteCommand command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM Account WHERE USERNAME = @username";
                    command.Parameters.AddWithValue("@username", username);
                    using (SQLiteDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            bool type = reader.GetBoolean(reader.GetOrdinal("TYPE"));
                            string name = reader.GetString(reader.GetOrdinal("NAME"));
                            string usernameDB = reader.GetString(reader.GetOrdinal("USERNAME"));
                            string password = reader.GetString(reader.GetOrdinal("PASSWORD"));
                            string phone_number = "";
                            try
                            {
                                phone_number = reader.GetString(reader.GetOrdinal("PHONE_NUMBER"));
                            }
                            catch { }
                            string response = $"{{ \"Type\": {type.ToString().ToLower()}, \"Name\": \"{name}\", \"Username\": \"{usernameDB}\", \"Password\": \"{password}\", \"PhoneNumber\": \"{phone_number}\" }}";
                            connection.Close();
                            return response;
                        }
                        else
                        {
                            connection.Close();
                            return "Tài khoản không tồn tại!";
                        }
                    }
                }
            }
        }

        public void UpdateInfo(string username, string password, string phone_number)
        {
            try
            {
                using (SQLiteConnection connection = new SQLiteConnection(connectionString))
                {
                    connection.Open();
                    using (SQLiteCommand command = connection.CreateCommand())
                    {
                        command.CommandText = "UPDATE Account SET PASSWORD = @password, PHONE_NUMBER = @phone_number WHERE USERNAME = @username";
                        command.Parameters.AddWithValue("@username", username);
                        command.Parameters.AddWithValue("@password", password);
                        command.Parameters.AddWithValue("@phone_number", phone_number);
                        command.ExecuteNonQuery();
                    }
                    connection.Close();
                }
            }
            catch
            {

                throw;
            }
        }
        public string GetListStudent()
        {
            List<Student> students = new List<Student>();
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                using (SQLiteCommand command = connection.CreateCommand())
                {
                    command.CommandText =
                    @"SELECT
                        USERNAME,
                        NAME,
                        PHONE_NUMBER
                    FROM
                        ACCOUNT
                    WHERE
                        TYPE = 1;";
                    using (SQLiteDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                var student = new Student
                                {
                                    Username = reader.GetString(reader.GetOrdinal("USERNAME")),
                                    Name = reader.GetString(reader.GetOrdinal("NAME")),
                                    PhoneNumber = reader.GetString(reader.GetOrdinal("PHONE_NUMBER"))
                                };
                                students.Add(student);
                            }
                            catch
                            {
                                var student = new Student
                                {
                                    Username = reader.GetString(reader.GetOrdinal("USERNAME")),
                                    Name = reader.GetString(reader.GetOrdinal("NAME")),
                                    PhoneNumber = ""
                                };
                                students.Add(student);
                            }
                        }
                    }
                }
            }
            string jsonString = JsonSerializer.Serialize(students);
            return jsonString;
        }

        public string GetSchedule()
        {
            List<Day> days = new List<Day>();
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                using (SQLiteCommand command = connection.CreateCommand())
                {
                    command.CommandText =
                    @"SELECT
                        ID,
                        SUBJECT1,
                        SUBJECT2,
                        SUBJECT3,
                        SUBJECT4,
                        SUBJECT5
                    FROM
                        SCHEDULE";
                    using (SQLiteDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                var day = new Day
                                {
                                    ID = reader.GetInt32(reader.GetOrdinal("ID")),
                                    Subject1 = reader.GetString(reader.GetOrdinal("SUBJECT1")),
                                    Subject2 = reader.GetString(reader.GetOrdinal("SUBJECT2")),
                                    Subject3 = reader.GetString(reader.GetOrdinal("SUBJECT3")),
                                    Subject4 = reader.GetString(reader.GetOrdinal("SUBJECT4")),
                                    Subject5 = reader.GetString(reader.GetOrdinal("SUBJECT5"))
                                };
                                days.Add(day);
                            }
                            catch
                            {
                            }
                        }
                    }
                }
            }
            string jsonString = JsonSerializer.Serialize(days);
            return jsonString;
        }

        public void UpdateSchedule(string day, string id, string content)
        {
            try
            {
                using (SQLiteConnection connection = new SQLiteConnection(connectionString))
                {
                    connection.Open();
                    using (SQLiteCommand command = connection.CreateCommand())
                    {
                        string subject = "SUBJECT" + id;
                        command.CommandText = $"UPDATE Schedule SET {subject} = @subject WHERE ID = @day";
                        command.Parameters.AddWithValue("@day", day);
                        command.Parameters.AddWithValue("@subject", content);
                        command.ExecuteNonQuery();
                    }
                    connection.Close();
                }
            }
            catch
            {
                throw;
            }
        }

        public string GetScore(string username)
        {
            List<Score> scores = new List<Score>();
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                using (SQLiteCommand command = connection.CreateCommand())
                {
                    command.CommandText =
                    @"SELECT * FROM SCORE WHERE STUDENTID = @username";
                    command.Parameters.AddWithValue("@username", username);
                    using (SQLiteDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                var score = new Score
                                {
                                    STUDENTID = reader.GetString(reader.GetOrdinal("STUDENTID")),
                                    SUBJECT = reader.GetString(reader.GetOrdinal("SUBJECT")),
                                    PASS = reader.GetBoolean(reader.GetOrdinal("PASS")),
                                    SCORE = reader.GetInt32(reader.GetOrdinal("SCORE")),
                                    TYPE = reader.GetString(reader.GetOrdinal("TYPE")),
                                    NOTE = reader.GetString(reader.GetOrdinal("NOTE"))
                                };
                                scores.Add(score);
                            }
                            catch
                            {
                                throw;
                            }
                        }
                    }
                }
            }
            string jsonString = JsonSerializer.Serialize(scores);
            return jsonString;
        }

        public void AddScore(string username, string subject, bool pass, int score, string type, string note)
        {
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                using (SQLiteCommand command = connection.CreateCommand())
                {
                    command.CommandText = "INSERT INTO Score (STUDENTID, SUBJECT, PASS, SCORE, TYPE, NOTE) VALUES (@studentID, @subject, @pass, @score, @type, @note)";
                    command.Parameters.AddWithValue("@studentID", username);
                    command.Parameters.AddWithValue("@subject", subject);
                    command.Parameters.AddWithValue("@pass", pass);
                    command.Parameters.AddWithValue("@score", score);
                    command.Parameters.AddWithValue("@type", type);
                    command.Parameters.AddWithValue("@note", note);
                    command.ExecuteNonQuery();
                }
                connection.Close();
            }
        }

        public void DeleteScore(string username, string subject)
        {
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                using (SQLiteCommand command = connection.CreateCommand())
                {
                    command.CommandText = "DELETE FROM SCORE WHERE STUDENTID = @studentID AND SUBJECT = @subject";
                    command.Parameters.AddWithValue("@studentID", username);
                    command.Parameters.AddWithValue("@subject", subject);
                    command.ExecuteNonQuery();
                }
                connection.Close();
            }
        }
        public string AddStudent(string name, string username, string password)
        {
            using (SQLiteConnection connection = new SQLiteConnection(connectionString))
            {
                connection.Open();
                using (SQLiteCommand checkCommand = connection.CreateCommand())
                {
                    checkCommand.CommandText = "SELECT USERNAME FROM ACCOUNT WHERE USERNAME=@username";
                    checkCommand.Parameters.AddWithValue("@username", username);
                    using (SQLiteDataReader reader = checkCommand.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            return "Tài khoản đã tồn tại";
                        }
                    }
                }

                using (SQLiteCommand insertCommand = connection.CreateCommand())
                {
                    bool type = true;
                    insertCommand.CommandText = "INSERT INTO ACCOUNT (NAME,TYPE, USERNAME, PASSWORD) VALUES (@name,@type, @username, @password)";
                    insertCommand.Parameters.AddWithValue("@name", name);
                    insertCommand.Parameters.AddWithValue("@type", type);
                    insertCommand.Parameters.AddWithValue("@username", username);
                    insertCommand.Parameters.AddWithValue("@password", password);
                    insertCommand.ExecuteNonQuery();
                }

                connection.Close();
                return "Đăng kí thành công";
            }
        }


        public class Score
        {
            public string STUDENTID { get; set; }
            public string SUBJECT { get; set; }
            public bool PASS { get; set; }
            public int SCORE { get; set; }
            public string TYPE { get; set; }
            public string NOTE { get; set; }
        }
        public class Day
        {
            public int ID { get; set; }
            public string Subject1 { get; set; }
            public string Subject2 { get; set; }
            public string Subject3 { get; set; }
            public string Subject4 { get; set; }
            public string Subject5 { get; set; }

        }
        public class Student
        {
            public string Username { get; set; }
            public string Name { get; set; }
            public string PhoneNumber { get; set; }
        }

    }
}
