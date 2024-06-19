using System.Text.Json;
namespace THPTAdminSystem
{
    internal class API
    {
        public string GetType(string fullData)
        {

            JsonElement data = JsonSerializer.Deserialize<dynamic>(fullData);

            if (data.TryGetProperty("type", out JsonElement keyType))
            {
                return keyType.ToString();
            }
            else { return "Lỗi: Thiếu key type!"; }
        }
        public string Login(string message)
        {
            if (!string.IsNullOrEmpty(message))
            {
                JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                string receivedUsername = "";
                string receivedPassword = "";

                if (data.TryGetProperty("username", out JsonElement keyUserName))
                {
                    receivedUsername = keyUserName.GetString();
                    if (data.TryGetProperty("password", out JsonElement keyPassword))
                    {
                        receivedPassword = keyPassword.GetString();
                    }
                }
                Database db = new Database();
                string response = db.Login(receivedUsername, receivedPassword);
                return response;
            }
            else
            {
                return "Lỗi không xác định";
            }
        }
        public string GetInfo(string message)
        {
            if (!string.IsNullOrEmpty(message))
            {
                JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                string receivedUsername = "";
                if (data.TryGetProperty("username", out JsonElement keyUserName))
                {
                    receivedUsername = keyUserName.GetString();
                }
                Database db = new Database();
                string response = db.GetInfo(receivedUsername);
                return response;
            }
            else
            {
                return "Lỗi không xác định";
            }
        }
        public void UpdateInfo(string message)
        {
            if (!string.IsNullOrEmpty(message))
            {
                JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                string receivedUsername = "";
                string receivedPassword = "";
                string receivedPhonenumber = "";
                if (data.TryGetProperty("username", out JsonElement keyUserName))
                {
                    receivedUsername = keyUserName.GetString();
                    if (data.TryGetProperty("password", out JsonElement keyPassword))
                    {
                        receivedPassword = keyPassword.GetString();
                    }
                    if (data.TryGetProperty("phonenumber", out JsonElement keyPhonenumber))
                    {
                        receivedPhonenumber = keyPhonenumber.GetString();
                    }
                }
                Database db = new Database();
                db.UpdateInfo(receivedUsername, receivedPassword, receivedPhonenumber);
            }
            else
            {
            }
        }
        public string GetListStudent()
        {
            Database db = new Database();
            string message = db.GetListStudent();
            return message;
        }
        public string GetSchedule()
        {
            Database db = new Database();
            string message = db.GetSchedule();
            return message;
        }
        public void UpdateSchedule(string message)
        {
            if (!string.IsNullOrEmpty(message))
            {
                JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                string receivedDay = "";
                string receivedID = "";
                string receivedContent = "";
                if (data.TryGetProperty("day", out JsonElement keyDay))
                {
                    receivedDay = keyDay.GetString();
                    if (data.TryGetProperty("id", out JsonElement keyID))
                    {
                        receivedID = keyID.GetString();
                    }
                    if (data.TryGetProperty("content", out JsonElement keyContent))
                    {
                        receivedContent = keyContent.GetString();
                    }
                }
                Database db = new Database();
                db.UpdateSchedule(receivedDay, receivedID, receivedContent);
            }
            else
            {
            }
        }
        public string GetScore(string message)
        {
            string response = "";
            if (!string.IsNullOrEmpty(message))
            {
                JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                string receivedUsername = "";
                if (data.TryGetProperty("username", out JsonElement keyUsername))
                {
                    receivedUsername = keyUsername.GetString();
                }
                Database db = new Database();
                response = db.GetScore(receivedUsername);

            }
            return response;
        }

        public void DeleteScore(string message)
        {
            if (!string.IsNullOrEmpty(message))
            {
                JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                string receivedUsername = "";
                string receivedSubject = "";
                if (data.TryGetProperty("username", out JsonElement keyUsername))
                {
                    receivedUsername = keyUsername.GetString();
                }
                if (data.TryGetProperty("subject", out JsonElement keySubject))
                {
                    receivedSubject = keySubject.GetString();
                }
                Database db = new Database();
                db.DeleteScore(receivedUsername, receivedSubject);
            }
        }

        public void AddScore(string message)
        {
            if (!string.IsNullOrEmpty(message))
            {
                JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                string receivedUsername = "";
                string receivedSubject = "";
                bool receivedPass = false;
                int receivedScore = 0;
                string receivedType = "";
                string receivedNote = "";
                if (data.TryGetProperty("username", out JsonElement keyUsername))
                {
                    receivedUsername = keyUsername.GetString();
                }
                if (data.TryGetProperty("subject", out JsonElement keySubject))
                {
                    receivedSubject = keySubject.GetString();
                }
                if (data.TryGetProperty("score", out JsonElement keyScore))
                {
                    receivedScore = keyScore.GetInt16();
                }
                if (data.TryGetProperty("pass", out JsonElement keyPass))
                {
                    receivedPass = keyPass.GetBoolean();
                }
                if (data.TryGetProperty("note", out JsonElement keyNote))
                {
                    receivedNote = keyNote.GetString();
                }
                if (data.TryGetProperty("level", out JsonElement keyType))
                {
                    receivedType = keyType.GetString();
                }

                Database db = new Database();
                db.AddScore(receivedUsername, receivedSubject, receivedPass, receivedScore, receivedType, receivedNote);
            }
        }

        public string AddStudent(string message)
        {
            string response = "Lỗi không xác định";
            if (!string.IsNullOrEmpty(message))
            {
                JsonElement data = JsonSerializer.Deserialize<dynamic>(message);
                string receivedName = "";
                string receivedUsername = "";
                string receivedPassword = "";
                if (data.TryGetProperty("username", out JsonElement keyUsername))
                {
                    receivedUsername = keyUsername.GetString();
                }
                if (data.TryGetProperty("password", out JsonElement keyPassword))
                {
                    receivedPassword = keyPassword.GetString();
                }
                if (data.TryGetProperty("name", out JsonElement keyName))
                {
                    receivedName = keyName.GetString();
                }

                Database db = new Database();
                response = db.AddStudent(receivedName, receivedUsername, receivedPassword);
            }
            return response;
        }
    }
}
