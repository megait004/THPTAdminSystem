using System;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
namespace THPTAdminSystem
{
    public partial class Gui : Form
    {
        public Gui()
        {
            InitializeComponent();
            InitializeAsync();
            Database database = new Database();
            database.initDatabase();
        }

        async void InitializeAsync()
        {
            await webView2.EnsureCoreWebView2Async(null);
            StartHttpListener();
            webView2.CoreWebView2.Navigate("http://localhost:8080/");
            webView2.CoreWebView2.WebMessageReceived += OnWebMessageReceived;
        }

        private void StartHttpListener()
        {
            string exePath = System.Reflection.Assembly.GetExecutingAssembly().Location;
            string exeFolder = Path.GetDirectoryName(exePath);
            string websiteFolder = Path.Combine(exeFolder, "src");
            string htmlPath = Path.Combine(websiteFolder, "index.html");

            if (File.Exists(htmlPath))
            {
                Task.Run(async () =>
                {
                    HttpListener listener = new HttpListener();
                    listener.Prefixes.Add("http://localhost:8080/");
                    listener.Start();

                    while (true)
                    {
                        HttpListenerContext context = await listener.GetContextAsync();
                        HttpListenerRequest request = context.Request;
                        HttpListenerResponse response = context.Response;

                        string filePath = Path.Combine(websiteFolder, request.Url.LocalPath.TrimStart('/'));

                        if (Directory.Exists(filePath))
                        {
                            filePath = Path.Combine(filePath, "index.html");
                        }
                        else if (!File.Exists(filePath))
                        {
                            filePath = Path.Combine(websiteFolder, "index.html");
                        }
                        if (File.Exists(filePath))
                        {
                            string extension = Path.GetExtension(filePath).ToLower();
                            string mimeType = GetMimeType(extension);
                            byte[] content = File.ReadAllBytes(filePath);

                            response.ContentType = mimeType;
                            response.ContentLength64 = content.Length;
                            await response.OutputStream.WriteAsync(content, 0, content.Length);
                        }
                        else
                        {
                            response.StatusCode = 404;
                            byte[] content = Encoding.UTF8.GetBytes("404 - File not found");
                            await response.OutputStream.WriteAsync(content, 0, content.Length);
                        }

                        response.OutputStream.Close();
                    }
                });

            }
            else
            {
                MessageBox.Show("Thiếu tệp thực thi!");
            }
        }

        private string GetMimeType(string extension)
        {
            switch (extension)
            {
                case ".html": return "text/html";
                case ".js": return "application/javascript";
                case ".css": return "text/css";
                case ".png": return "image/png";
                case ".jpg": return "image/jpeg";
                case ".gif": return "image/gif";
                case ".svg": return "image/svg+xml";
                default: return "application/octet-stream";
            }
        }

        private void OnWebMessageReceived(object sender, CoreWebView2WebMessageReceivedEventArgs args)
        {
            API api = new API();
            string message = args.WebMessageAsJson;
            string type = api.GetType(message);
            if (type == "login")
            {
                string response = api.Login(message);
                webView2.CoreWebView2.PostWebMessageAsString(response);
            }
            if (type == "getinfo")
            {
                string response = api.GetInfo(message);
                webView2.CoreWebView2.PostWebMessageAsString(response);
            }
            if (type == "updateinfo")
            {
                api.UpdateInfo(message);
            }
            if (type == "getstudent")
            {
                string response = api.GetListStudent();
                webView2.CoreWebView2.PostWebMessageAsString(response);
            }
            if (type == "getschedule")
            {
                string response = api.GetSchedule();
                webView2.CoreWebView2.PostWebMessageAsString(response);
            }
            if (type == "updateschedule")
            {
                api.UpdateSchedule(message);
            }
            if (type == "getscore")
            {
                string response = api.GetScore(message);
                webView2.CoreWebView2.PostWebMessageAsString(response);
            }

            if (type == "deletescore")
            {
                api.DeleteScore(message);
            }
            if (type == "addscore")
            {
                api.AddScore(message);
            }
            if (type == "signup")
            {
                string response = api.AddStudent(message);
                webView2.CoreWebView2.PostWebMessageAsString(response);
            }
        }

        private void Gui_Load(object sender, EventArgs e)
        {

        }

        private void webView2_Click(object sender, EventArgs e)
        {

        }
    }
}
