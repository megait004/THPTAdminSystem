using System;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
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
            Server server = new Server();
            server.StartHttpListener();
            await webView2.EnsureCoreWebView2Async(null);
            webView2.CoreWebView2.Navigate("http://localhost:8080/");
            webView2.CoreWebView2.WebMessageReceived += OnWebMessageReceived;
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
