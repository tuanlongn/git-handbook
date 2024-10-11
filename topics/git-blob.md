Trong Git, **Blob** (viết tắt của “Binary Large Object”) là một loại đối tượng cơ bản được sử dụng để lưu trữ `nội dung của tệp`. Blob không chứa bất kỳ siêu dữ liệu nào như tên tệp, vị trí trong thư mục, hay quyền truy cập; nó chỉ lưu trữ `nội dung thuần túy` của tệp dưới dạng nhị phân.

### Đặc điểm của Blob trong Git

* Lưu trữ nội dung tệp:
  * Blob chứa nội dung của tệp, bất kể đó là tệp văn bản hay tệp nhị phân.
  * Mỗi phiên bản khác nhau của một tệp sẽ được lưu trữ dưới dạng một Blob riêng biệt nếu nội dung thay đổi.
* Nhận dạng bằng mã băm SHA-1:
  * Mỗi Blob được nhận dạng duy nhất bằng một mã băm SHA-1 được tính từ nội dung của nó.
  * Điều này đảm bảo tính toàn vẹn dữ liệu và giúp Git phát hiện khi nội dung tệp đã thay đổi.
* Không chứa thông tin về tên tệp hoặc cấu trúc thư mục:
  * Blob chỉ lưu trữ nội dung, không biết tên tệp hay vị trí của nó trong dự án.
  * Thông tin về tên tệp và cấu trúc thư mục được lưu trữ trong các đối tượng Tree.

### Vai trò của Blob trong Git

* Cấu thành lịch sử phiên bản:
  * Khi bạn thực hiện git add và git commit, nội dung của các tệp được lưu trữ dưới dạng Blob.
  * Git sử dụng Blob để theo dõi sự thay đổi nội dung của tệp qua các commit.
* Tái sử dụng dữ liệu:
  * Nếu nhiều tệp có cùng nội dung, Git sẽ lưu trữ chúng dưới cùng một Blob để tiết kiệm không gian.

### Liên kết với các đối tượng khác

* Tree:
  * Tree là đối tượng chứa tham chiếu đến Blob và các Tree con, cùng với tên tệp và quyền truy cập.
  * Tree xây dựng cấu trúc thư mục của dự án bằng cách kết hợp Blob và các Tree khác.
* Commit:
  * Commit tham chiếu đến một Tree gốc, đại diện cho trạng thái của dự án tại thời điểm commit.
  * Nhờ đó, Git có thể tái tạo lại toàn bộ dự án tại bất kỳ commit nào.

### Ví dụ về cách Blob hoạt động

Giả sử bạn có tệp example.txt với nội dung:

```text
Hello, Git!
```

* Khi bạn thêm tệp này vào vùng tạm và commit:

1. Tạo Blob:

* Git tạo một Blob chứa nội dung “Hello, Git!”.
* Blob này được nhận dạng bằng mã băm SHA-1 dựa trên nội dung.

2. Tạo Tree:

* Tree chứa tham chiếu đến Blob và lưu tên tệp example.txt.

3. Tạo Commit:

* Commit tham chiếu đến Tree vừa tạo và lưu thông tin metadata như tác giả, thông điệp commit.

### Tóm lại

* Blob là đối tượng lưu trữ nội dung của tệp trong Git.
* Không chứa thông tin về tên tệp hoặc cấu trúc thư mục.
* Kết hợp với Tree và Commit để xây dựng lịch sử và cấu trúc của dự án.
