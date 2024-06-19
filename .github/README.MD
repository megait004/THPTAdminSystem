# BÁO CÁO ĐỒ ÁN: ỨNG DỤNG WINFORM KẾT HỢP REACT SỬ DỤNG WEBVIEW2

## I. Giới thiệu

Sử dụng giữa WinForm và ReactJS, sử dụng WebView2 để tạo giao diện người dùng. Mục tiêu của dự án là cung cấp một trải nghiệm người dùng đẹp hơn, so với ứng dụng WinForm truyền thống. Các ưu điểm chính của dự án bao gồm giao tiếp thông qua API của WebView2 Winform - giao tiếp với Javascript thay vì đẩy dữ liệu lên GridView.

## II. Kế hoạch làm đề tài

1. **Thiết kế cơ sở dữ liệu**

   - **Bảng Account**:
     - Giáo viên:
       - Quyền:
       - Hiển thị:
     - Học sinh:
       - PRIMARY KEY: id - Tương ứng với studentID trong bảng Score
       - Quyền:
       - Hiển thị:
   - **Bảng Score**:

     - Hiển thị: | Điểm số | Môn học | Xếp Loại .....
     - FOREIGN KEY: studentID - nhận từ ID của mỗi học sinh tương ứng!

   - **Bảng lịch học**:
     - Hiển thị: Hiển thị thời khoá biểu!

###### Database

   ![image](./assets/Database.png)

## III. Công nghệ sử dụng

1. **WinForm(.NET 4.7.2) và ReactJS(Vite):**

   - WinForm được sử dụng để tạo giao diện cơ bản của ứng dụng.
   - React được tích hợp vào ứng dụng thông qua WebView2 để tạo giao diện người dùng đẹp hơn và tăng cường tính tương tác.

2. **WebView2:**

   - WebView2 được sử dụng để hiển thị nội dung ReactJS trong ứng dụng WinForm.
   - Giao tiếp thông qua API sẵn có của WebView2: [xem chi tiết tại đây!](https://learn.microsoft.com/en-us/microsoft-edge/webview2/reference/javascript/webview#properties)

3. **SQLite:**

   - SQLite được sử dụng để lưu trữ dữ liệu của ứng dụng,có thời gian thao tác nhanh hơn so với các hệ thống quản lý cơ sở dữ liệu phức tạp như MySQL, SQL Server...

## IV. Mô hình hệ thống

1. **Các chức năng của hệ thống**

    - 1.1. Đăng nhập/Đăng kí:

      - Phân quyền sử dụng riêng cho học sinh và giáo viên, mỗi học sinh sẽ có bảng điểm khác nhau

    - 1.2. Xem điểm và thời khoá biểu(Lấy từ Database):

      - Quyền thao tác với thời khoá biểu và bảng điểm:

        | Quyền    | Giáo Viên | Học Sinh |
        | -------- | --------- | -------- |
        | Tạo      | Có ✅     | Không ❌ |
        | Xem      | Có ✅     | Có ✅    |
        | Cập Nhật | Có ✅     | Không ❌ |
        | Xoá      | Có ✅     | Không ❌ |

        **Lưu ý:** Học sinh chỉ xem được điểm của tài khoản của học sinh đó!

2. **Các giao diện có trong hệ thống**

    | Component          | Child Component | Mô tả                                                                                                                             |
    | ------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
    | Đăng nhập/ Đăng kí | Không           | Cho phép người dùng đăng nhập vào hệ thống bằng tài khoản đã có hoặc đăng ký tài khoản mới để sử dụng các tính năng của ứng dụng. |
    | Dashboard          | Trang chủ       | Cung cấp giao diện tổng quan về các thông tin và tính năng chính của ứng dụng.                                                    |
    |                    | Tài khoản       | Cho phép người dùng xem và cập nhật thông tin tài khoản của mình.                                                                 |
    |                    | Điểm            | Hiển thị điểm số hoặc thành tích của người dùng trong ứng dụng.                                                                   |
    |                    | Thời khoá biểu  | Hiển thị lịch trình hoặc kế hoạch của người dùng trong ứng dụng.                                                                  |
    |                    | Repport Lỗi     | Cho phép người dùng báo cáo lỗi hoặc vấn đề gặp phải trong quá trình sử dụng ứng dụng.                                            |
    |                    | Đăng xuất       | Cho phép người dùng đăng xuất khỏi tài khoản và ứng dụng.                                                                         |

3. **Mô hình cơ sở dữ liệu**

###### db

- **Main Class**: `Database`

  - **Method**:

    - **initDatabase**: Khởi tạo cơ sở dữ liệu( Tạo các bảng và các trường [tương ứng](#database))
      - SQL:

        ```SQL

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
        ```

    - **Login**(string username, string password): Truyền vào 2 tham số là `username` và `password`
      - SQL:

          ```SQL
          SELECT * FROM Account WHERE USERNAME = @username AND PASSWORD = @password
          ```

      - Response:

        ```json
                {"Đăng nhập thành công"}
                {"Đăng nhập thất bại"}
        ```

    - **GetInfo**(string username):
      - SQL:

          ```SQL
          SELECT * FROM Account WHERE USERNAME = @username
          ```

      - Response:

        ```json
        {
            "Type": 0,
            "Name": "Tên người dùng",
            "Username": "admin",
            "Password": "admin",
            "PhoneNumber": "0123456789"
        }
        ```

    - **UpdateInfo**(string username, string password, string phone_number): Cập nhật thông tin tài khoản
      - SQL:

          ```SQL
          UPDATE Account SET PASSWORD = @password, PHONE_NUMBER = @phone_number WHERE USERNAME = @username
          ```

    - **GetListStudent**: Lấy ra danh sách các học sinh
      - SQL:

          ```SQL
          SELECT
              USERNAME,
              NAME,
              PHONE_NUMBER
          FROM
              ACCOUNT
          WHERE
              TYPE = 1;
          ```

    - **GetSchedule**: Lấy ra thời khoá biểu
      - SQL:

        ```SQL
        SELECT
            ID,
            SUBJECT1,
            SUBJECT2,
            SUBJECT3,
            SUBJECT4,
            SUBJECT5
        FROM
            SCHEDULE
        ```

    - **UpdateSchedule**(string day, string id, string content): Cập nhật thời khoá biểu
      - SQL:

      ```SQL
      UPDATE Schedule SET {subject(truyen vao tu fstring c#)} = @subject WHERE ID = @day
      ```

    - **GetScore**(string username): Lấy ra điểm của học sinh tương ứng
      - SQL:

        ```SQL
        SELECT * FROM SCORE WHERE STUDENTID = @username
        ```

    - **DeleteScore**(string username, string subject): Xoá điểm của một môn học
      - SQL:

        ```SQL
        DELETE FROM SCORE WHERE STUDENTID = @studentID AND SUBJECT = @subject
        ```

    - **AddScore**(string username, string subject, bool pass, int score, string type, string note): Thêm điểm cho học sinh tương ứng
      - SQL:

        ```SQL
        INSERT INTO Score (STUDENTID, SUBJECT, PASS, SCORE, TYPE, NOTE) VALUES (@studentID,     @subject, @pass, @score, @type, @note)
        ```

    - **AddStudent**(string name, string username, string password): Tạo tài khoản với Tên | Username | Mật khẩu tương ứng
      - SQL:

        ```SQL
        SELECT USERNAME FROM ACCOUNT WHERE USERNAME=@username
        ```

      - Response:

        ```json
        {"Đăng kí thành công"}
        ```

## V. Phát triển hệ thống

1. **Lớp Gui**
    - Đây là lớp chính của giao diện ứng dụng, kế thừa từ `Form` trong `System.Windows.Forms`.
    - Sử dụng `WebView2` để hiển thị giao diện web trong ứng dụng Windows.

    - 1.1. **Constructor Gui()**
      - Gọi `InitializeComponent()` để khởi tạo các thành phần giao diện.
      - Gọi `InitializeAsync()` để khởi tạo `WebView2` và kết nối với server.
      - Khởi tạo đối tượng `Database` và gọi phương thức `initDatabase()` để khởi tạo cơ sở dữ liệu.

    - 1.2. **Phương thức InitializeAsync()**

      - Khởi tạo đối tượng `Server` và gọi phương thức `StartHttpListener()` để khởi động server HTTP.
      - Gọi `EnsureCoreWebView2Async()` để đảm bảo rằng `WebView2` đã được khởi tạo.
      - Điều hướng `WebView2` đến địa chỉ `http://localhost:8080/`.
      - Đăng ký sự kiện `WebMessageReceived` để xử lý tin nhắn từ `WebView2`.

    - 1.3. **Phương thức OnWebMessageReceived()**

      - Được gọi khi có tin nhắn từ `WebView2`.
      - Khởi tạo đối tượng `API`.
      - Lấy tin nhắn từ `args.WebMessageAsJson`.
      - Gọi phương thức `GetType()` trong `API` để lấy loại của tin nhắn.
      - Dựa vào loại tin nhắn, gọi các phương thức tương ứng trong `API` để xử lý và gửi phản hồi lại cho `WebView2` thông qua `PostWebMessageAsString()`.

2. **Lớp BUS**
    - Lớp này chứa các phương thức để xử lý các yêu cầu từ giao diện web và tương tác với cơ sở dữ liệu.

    - 2.1. **Phương thức GetType(string fullData)**
      - Phương thức này nhận vào một chuỗi JSON và trích xuất giá trị của khóa "type" từ đó.
      - Sử dụng `JsonSerializer.Deserialize` để chuyển đổi chuỗi JSON thành đối tượng JSON.
      - Trả về giá trị của khóa "type" nếu tồn tại, ngược lại trả về thông báo lỗi.

    - 2.2. **Phương thức Login(string message)**
      - Phương thức này xử lý yêu cầu đăng nhập.
      - Nhận vào một chuỗi JSON chứa thông tin đăng nhập (tên đăng nhập và mật khẩu).
      - Trích xuất tên đăng nhập và mật khẩu từ chuỗi JSON.
      - Gọi phương thức `Login` trong lớp `Database` để xác thực đăng nhập.
      - Trả về phản hồi từ cơ sở dữ liệu.

    - 2.3. **Phương thức GetInfo(string message)**
      - Phương thức này lấy thông tin người dùng từ cơ sở dữ liệu.
      - Nhận vào một chuỗi JSON chứa tên đăng nhập.
      - Trích xuất tên đăng nhập từ chuỗi JSON.
      - Gọi phương thức `GetInfo` trong lớp `Database` để lấy thông tin người dùng.
      - Trả về phản hồi từ cơ sở dữ liệu.

    - 2.4. **Phương thức UpdateInfo(string message)**
      - Phương thức này cập nhật thông tin người dùng trong cơ sở dữ liệu.
      - Nhận vào một chuỗi JSON chứa thông tin người dùng (tên đăng nhập, mật khẩu, số điện thoại).
      - Trích xuất thông tin người dùng từ chuỗi JSON.
      - Gọi phương thức `UpdateInfo` trong lớp `Database` để cập nhật thông tin người dùng.

    - 2.5. **Phương thức GetListStudent()**
      - Phương thức này lấy danh sách học sinh từ cơ sở dữ liệu.
      - Gọi phương thức `GetListStudent` trong lớp `Database`.
      - Trả về phản hồi từ cơ sở dữ liệu.

    - 2.6. **Phương thức GetSchedule()**
      - Phương thức này lấy thời khóa biểu từ cơ sở dữ liệu.
      - Gọi phương thức `GetSchedule` trong lớp `Database`.
      - Trả về phản hồi từ cơ sở dữ liệu.

    - 2.7. **Phương thức UpdateSchedule(string message)**
      - Phương thức này cập nhật thời khóa biểu trong cơ sở dữ liệu.
      - Nhận vào một chuỗi JSON chứa thông tin thời khóa biểu (ngày, ID, nội dung).
      - Trích xuất thông tin thời khóa biểu từ chuỗi JSON.
      - Gọi phương thức `UpdateSchedule` trong lớp `Database` để cập nhật thời khóa biểu.

    - 2.8. **Phương thức GetScore(string message)**
      - Phương thức này lấy điểm số của một học sinh từ cơ sở dữ liệu.
      - Nhận vào một chuỗi JSON chứa tên đăng nhập.
      - Trích xuất tên đăng nhập từ chuỗi JSON.
      - Gọi phương thức `GetScore` trong lớp `Database` để lấy điểm số.
      - Trả về phản hồi từ cơ sở dữ liệu.

    - 2.9. **Phương thức DeleteScore(string message)**
      - Phương thức này xóa điểm số của một học sinh trong cơ sở dữ liệu.
      - Nhận vào một chuỗi JSON chứa tên đăng nhập và môn học.
      - Trích xuất tên đăng nhập và môn học từ chuỗi JSON.
      - Gọi phương thức `DeleteScore` trong lớp `Database` để xóa điểm số.

    - 2.10. **Phương thức AddScore(string message)**
      - Phương thức này thêm điểm số cho một học sinh trong cơ sở dữ liệu.
      - Nhận vào một chuỗi JSON chứa thông tin điểm số (tên đăng nhập, môn học, điểm số, đạt/không đạt, ghi chú, loại điểm).
      - Trích xuất thông tin điểm số từ chuỗi JSON.
      - Gọi phương thức `AddScore` trong lớp `Database` để thêm điểm số.

    - 2.11. **Phương thức AddStudent(string message)**
      - Phương thức này đăng ký một học sinh mới trong cơ sở dữ liệu.
      - Nhận vào một chuỗi JSON chứa thông tin học sinh (tên đăng nhập, mật khẩu, tên học sinh).
      - Trích xuất thông tin học sinh từ chuỗi JSON.
      - Gọi phương thức `AddStudent` trong lớp `Database` để đăng ký học sinh mới.
      - Trả về phản hồi từ cơ sở dữ liệu.

3. **[Lớp DAL](#db)**

## VI. Kết luận

### Ưu điểm của dự án

1. **Giao tiếp qua API:**

    - Thay vì đẩy dữ liệu lên GridView truyền thống, việc truy cập dữ liệu trực tiếp thông qua API giúp giảm bớt bước trung gian và tối ưu hóa hiệu suất truy cập dữ liệu :>(các ứng dụng quản lí bình thường load những tệp dữ liệu lớn khá là lag :>, muốn chạy nhanh thì phải tạo luồng mới để tạo data cho grid,gây phức tạp ứng dụng)

2. **Tốc độ load nhanh hơn:**

    - Sử dụng WebView2 và giao tiếp qua API giúp ứng dụng load nhanh hơn so với việc đẩy dữ liệu lên GridView trong WinForm truyền thống.
    - WebView2 cho phép tải nội dung web một cách nhanh chóng và hiệu quả.
      ![image](./assets/Benchmark.png)

3. **Phát triển theo đăng ký tài khoản phân quyền:**
    - Phát triển theo mô hình đăng ký tài khoản giáo viên và học sinh giúp quản lý người dùng và quyền hạn một cách dễ dàng và linh hoạt.
    - Điều này tăng tính bảo mật và linh hoạt cho ứng dụng.

### Hạn chế và hướng phát triển của đề tài

WebView2 sử dụng `webView2.CoreWebView2.PostWebMessageAsString(response)` để giao tiếp giữa WebView2 và ứng dụng WinForm, dữ liệu chỉ có thể được truyền dưới dạng chuỗi `(string)`. Điều này gây ra một số hạn chế sau:

**Định dạng dữ liệu bị giới hạn**: Dữ liệu phải được chuyển đổi sang định dạng chuỗi trước khi gửi, và phải được giải mã từ chuỗi sau khi nhận.
