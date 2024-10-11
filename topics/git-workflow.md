## Git Workflow

- **Git Workflow** là một tập hợp các quy trình và quy tắc nhóm phát triển sử dụng để quản lý `codebase` và quá trình phát triển phần mềm bằng Git. Mục tiêu của Git Workflow là tối ưu hóa sự hợp tác, giảm thiểu xung đột code và đảm bảo chất lượng của sản phẩm cuối cùng.

### Các mô hình Git Workflow phổ biến

**1. Centralized Workflow**

- Mô tả:
  - Tất cả các nhà phát triển làm việc trực tiếp trên một nhánh duy nhất, thường là main hoặc master.

- Ưu điểm:
  - Đơn giản, dễ hiểu, phù hợp với các nhóm nhỏ hoặc dự án đơn giản.

- Nhược điểm:
  - Dễ dẫn đến xung đột code khi nhiều người cùng chỉnh sửa một phần của dự án.
  - Khó khăn trong việc theo dõi lịch sử phát triển của từng tính năng riêng lẻ.

**2. Feature Branch Workflow**

- Mô tả:
  - Mỗi tính năng hoặc sửa lỗi được phát triển trên một nhánh riêng (feature branch).
  - Sau khi hoàn thành, nhánh này được merge vào main thông qua pull request.

- Ưu điểm:
  - Tách biệt rõ ràng giữa các tính năng, dễ dàng trong việc code review.
  - Giảm thiểu xung đột code và ảnh hưởng đến nhánh chính.

- Nhược điểm:
  - Quản lý nhiều nhánh có thể phức tạp đối với người mới bắt đầu.

**3. Gitflow Workflow**

- Mô tả:
  - Giới thiệu các nhánh dài hạn như develop, release, hotfix, bên cạnh main.
  - Sử dụng nhánh develop để tích hợp các tính năng và chuẩn bị cho bản phát hành.

- Ưu điểm:
  - Phù hợp với dự án lớn, chu kỳ phát triển phức tạp.
  - Cho phép quản lý phiên bản và phát hành một cách có hệ thống.

- Nhược điểm:
  - Phức tạp, đòi hỏi sự hiểu biết sâu về Git.
  - Có thể gây chậm trễ trong việc triển khai liên tục (CI/CD).

**4. GitHub Flow**

- Mô tả:
  - Mọi công việc được thực hiện trên các nhánh tính năng.
  - Sau khi hoàn thành, tạo pull request để merge vào main.
  - Triển khai ngay sau khi merge.

- Ưu điểm:
  - Đơn giản, linh hoạt, thúc đẩy triển khai liên tục.

- Nhược điểm:
  - Không phù hợp với dự án cần quản lý phiên bản phức tạp.

**5. Forking Workflow**

- Mô tả:
  - Mỗi nhà phát triển fork repository chính về tài khoản cá nhân.
  - Thực hiện thay đổi và gửi pull request để đóng góp vào dự án gốc.
  
- Ưu điểm:
  - Phù hợp với dự án mã nguồn mở, cho phép cộng đồng đóng góp.

- Nhược điểm:
  - Quản lý pull request có thể trở nên khó khăn khi số lượng đóng góp lớn.