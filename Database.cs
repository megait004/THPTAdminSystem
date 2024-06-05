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
                    string initdb =
                        @"
                        CREATE TABLE IF NOT EXISTS
                            Account (
                                name TEXT NOT NULL,
                                type BOOL,
                                username TEXT UNIQUE NOT NULL,
                                password TEXT NOT NULL,
                                phonenumber CHAR(12)
                            );

                        CREATE TABLE IF NOT EXISTS
                            Score (
                                studentID TEXT,
                                subject TEXT NOT NULL UNIQUE,
                                pass BOOL,
                                score INTEGER,
                                type CHAR(10),
                                note TEXT,
                                FOREIGN KEY (studentID) REFERENCES Account (username)
                            );

                        CREATE TABLE IF NOT EXISTS
                            Schedule (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                Subject1 TEXT,
                                Subject2 TEXT,
                                Subject3 TEXT,
                                Subject4 TEXT,
                                Subject5 TEXT
                            );
                        INSERT or IGNORE INTO
                            Account (name, type, username, password)
                        VALUES
                            ('Giap', 0, 'admin', 'admin');
                        INSERT or IGNORE INTO
                            Schedule (
                                id,
                                Subject1,
                                Subject2,
                                Subject3,
                                Subject4,
                                Subject5
                            )
                        VALUES
                            (2, '', '', '', '', ''),
                            (3, '', '', '', '', ''),
                            (4, '', '', '', '', ''),
                            (5, '', '', '', '', ''),
                            (6, '', '', '', '', ''),
                            (7, '', '', '', '', '');
                    ";
                    command.CommandText = initdb;
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
                    command.CommandText = "SELECT * FROM Account WHERE username = @username AND password = @password";
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
                    command.CommandText = "SELECT * FROM Account WHERE username = @username";
                    command.Parameters.AddWithValue("@username", username);
                    using (SQLiteDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            bool type = reader.GetBoolean(reader.GetOrdinal("type"));
                            string name = reader.GetString(reader.GetOrdinal("name"));
                            string usernameDB = reader.GetString(reader.GetOrdinal("username"));
                            string password = reader.GetString(reader.GetOrdinal("password"));
                            string phonenumber = "";
                            try
                            {
                                phonenumber = reader.GetString(reader.GetOrdinal("phonenumber"));
                            }
                            catch { }
                            string response = $"{{ \"Type\": {type.ToString().ToLower()}, \"Name\": \"{name}\", \"Username\": \"{usernameDB}\", \"Password\": \"{password}\", \"PhoneNumber\": \"{phonenumber}\" }}";
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

        public void UpdateInfo(string username, string password, string phonenumber)
        {
            try
            {
                using (SQLiteConnection connection = new SQLiteConnection(connectionString))
                {
                    connection.Open();
                    using (SQLiteCommand command = connection.CreateCommand())
                    {
                        command.CommandText = "UPDATE Account SET password = @password, phonenumber = @phonenumber WHERE username = @username";
                        command.Parameters.AddWithValue("@username", username);
                        command.Parameters.AddWithValue("@password", password);
                        command.Parameters.AddWithValue("@phonenumber", phonenumber);
                        command.ExecuteNonQuery();
                    }
                    connection.Close();
                }
            }
            catch
            {
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
                        PHONENUMBER
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
                                    PhoneNumber = reader.GetString(reader.GetOrdinal("PHONENUMBER"))
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
