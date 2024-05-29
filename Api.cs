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

                string usernameDb = "admin";
                string passwordDb = "admin";
                if (receivedUsername == usernameDb)
                {
                    if (receivedPassword == passwordDb)
                    {
                        return "Đăng nhập thành công";
                    }
                    else
                    {
                        return "Sai mật khẩu!";
                    }
                }
                else
                {
                    return "Tài khoản không tồn tại!";
                }
            }
            else
            {
                return "Lỗi không xác định";
            }
        }
    }
}
