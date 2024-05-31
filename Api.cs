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
    }
}
