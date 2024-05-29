# THPTAdminSystem

## Yêu cầu hệ thống

- [.NET Framework 4.7.2](https://dotnet.microsoft.com/en-us/download/dotnet-framework/net472)
- [.NET SDK](https://download.visualstudio.microsoft.com/download/pr/2e3d0e1d-ad81-4ca7-b186-49f2313547e7/ee8546e4148b87c6e14878b5055406e9/dotnet-sdk-8.0.301-win-x64.exe)
- [NuGet CLI](https://dist.nuget.org/win-x86-commandline/latest/nuget.exe)

### Build

Mở File `THPTAdminSystem.sln` với Visual Studio hoặc dùng command line!

```sh
nuget restore
msbuild THPTAdminSystem.sln
```

hoặc

```sh
dotnet add package Microsoft.Web.WebView2 --version 1.0.2535.41
dotnet build
```

Copy thư mục chứa file html,css,js vào trong thư mục `src` cùng đường dẫn với file exe để chạy :)
