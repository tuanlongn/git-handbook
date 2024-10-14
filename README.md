### Các đối tượng (thành phần) của Git

```mermaid
graph LR
    subgraph Git Objects
        Commit1[Commit<br/>SHA: c1a2b3]
        Commit2[Commit<br/>SHA: c4d5e6]
        Tree1[Tree<br/>SHA: t1a2b3]
        Tree2[Tree<br/>SHA: t4d5e6]
        Blob1[Blob<br/>SHA: b1a2c3<br/>file1.txt]
        Blob2[Blob<br/>SHA: b4d5e6<br/>file2.js]
        Blob3[Blob<br/>SHA: b7g8h9<br/>README.md]
        Tag1[Tag<br/>SHA: tag1<br/>v1.0]
    end

    subgraph Relationships
        Commit1 -->|points to| Tree1
        Commit2 -->|points to| Tree2
        Commit2 -->|parent| Commit1
        Tree1 -->|contains| Blob1
        Tree1 -->|contains| Blob2
        Tree2 -->|contains| Blob1
        Tree2 -->|contains| Blob3
        Tag1 -->|points to| Commit1
    end

    style Git Objects fill:#f9f,stroke:#333,stroke-width:2px
    style Relationships fill:#ccf,stroke:#333,stroke-width:2px
```

- Trong **Git** thư mục `.git/objects/` là nơi lưu trữ tất cả các đối tượng (**objects**) như **blob**, **tree**, **commit**, và **tag**. Mỗi đối tượng này được nhận dạng duy nhất bằng một mã băm **SHA-1** dài **40 ký tự**. [Xem chi tiết](topics/git-objects.md).

- Git `Blob` (viết tắt của “Binary Large Object”) là một loại đối tượng cơ bản được sử dụng để lưu trữ `nội dung của tệp`. [Xem chi tiết](topics/git-blob.md).
- Git **Tree** là đại diện cho cấu trúc thư mục tại một thời điểm cụ thể. [Xem chi tiết](topics/git-tree.md).

### Sử dụng Git trong công việc (workflow)

- Trong quá trình phát triển dự án, có những lúc bạn đang làm việc trên một tính năng mới nhưng cần chuyển đổi sang một nhánh khác hoặc cập nhật mã nguồn từ xa. Tuy nhiên, các thay đổi hiện tại của bạn chưa sẵn sàng để commit. Hãy sử dụng [`git stash`](topics/git-stash.md).

- **Git Workflow** được sử dụng để tối ưu hóa hợp tác, giảm xung đột code và đảm bảo chất lượng sản phẩm. [Xem chi tiết](topics/git-workflow.md).
