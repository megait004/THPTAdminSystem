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
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                name TEXT NOT NULL,
                                type BOOL,
                                username TEXT UNIQUE NOT NULL,
                                password TEXT NOT NULL,
                                phonenumber CHAR(12)
                            );

                        CREATE TABLE IF NOT EXISTS
                            Score (
                                studentID INTEGER,
                                subject TEXT NOT NULL,
                                pass BOOL,
                                score INTEGER,
                                type CHAR(10),
                                note TEXT,
                                FOREIGN KEY (studentID) REFERENCES Account (id)
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
                            int id = reader.GetInt32(reader.GetOrdinal("id"));
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
                            string response = $"{{ \"ID\": {id}, \"Type\": {type.ToString().ToLower()}, \"Name\": \"{name}\", \"Username\": \"{usernameDB}\", \"Password\": \"{password}\", \"PhoneNumber\": \"{phonenumber}\" }}";
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

        public class Student
        {
            public string Username { get; set; }
            public string Name { get; set; }
            public string PhoneNumber { get; set; }
        }

    }
}
