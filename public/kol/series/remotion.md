
  

# Hướng Dẫn Setup Và Tạo Video Bằng Remotion Với AI

  

  

Tài liệu này dành cho người mới, không cần biết nhiều về code. Mục tiêu là giúp bạn mở được project Remotion, nhờ AI như Claude Code hoặc Codex hỗ trợ setup, rồi tạo video mới bằng cách mô tả ý tưởng.

  

> Checkout repo github tại: [an6122003/ai-remotion-video-starter](https://github.com/an6122003/ai-remotion-video-starter)
  

  

## 1. Bạn Cần Chuẩn Bị Gì?

  

  

Bạn cần có:

  

  

- Một máy tính có internet

  

- Node.js và npm

  

- Project Remotion này

  

- Một công cụ AI coding như Claude Code hoặc Codex

  

  

Nếu bạn chưa biết Node.js, npm, terminal là gì thì không sao. Bạn có thể nhờ AI hướng dẫn từng bước.

  

  

Ví dụ, bạn có thể nói với AI:

  

  

```text

  

Hãy cài Node.js và npm để chạy project Remotion này. Tôi không rành kỹ thuật, hãy chỉ từng bước đơn giản.

  

```

  

  

Hoặc:

  

  

```text

  

Please help me install Node.js and npm so I can run this Remotion project.

  

Explain it step by step for a non-technical user.

  

```

  

  

## 2. Cài Node.js Và npm

  

  

(Bỏ qua bước này nếu bước 1 đã dùng AI để cài hộ)

  

  

Node.js là công cụ cần thiết để chạy project. npm thường được cài kèm với Node.js.

  

  

Cách đơn giản nhất:

  

  

1. Mở trang [nodejs.org](https://nodejs.org)

  

2. Tải bản **LTS**

  

3. Cài như phần mềm bình thường

  

4. Mở terminal và kiểm tra:

  

  

```bash

  

node  -v

  

npm  -v

  

```

  

  

Nếu thấy hiện ra số phiên bản, ví dụ `v22.x.x` hoặc `10.x.x`, nghĩa là đã cài được.

  

  

Nếu bị lỗi ở bước này, hãy copy lỗi đó và gửi cho AI:

  

  

```text

  

Tôi đang cài Node.js/npm để chạy Remotion nhưng bị lỗi này. Hãy giải thích đơn giản và chỉ tôi cách sửa:

  

  

[DÁN LỖI Ở ĐÂY]

  

```

  

  

## 3. Lấy Project Về Máy

  

  

> Link Repo: https://github.com/an6122003/ai-remotion-video-starter

  

Bỏ thẳng link vào claude code để nhờ nó tải xuống hộ bạn cũng được nhé.

  

Nếu bạn dùng GitHub:

  

  

1. Mở repo GitHub của project

  

2. Bấm **Use this template** nếu có

  

3. Tạo một bản copy riêng cho bạn

  

4. Tải project về máy hoặc clone bằng Git

  

  

Nếu bạn không biết Git, hãy tải ZIP:

  

  

1. Bấm **Code**

  

2. Chọn **Download ZIP**

  

3. Giải nén file ZIP

  

4. Mở thư mục project

  

  

## 4. Mở Project Bằng AI Coding Tool

  

  

Bạn có thể dùng một trong các công cụ sau:

  

  

- Claude Code

  

- Codex

  

- Cursor

  

- Gemini CLI

  

  

Với Claude Code, mở terminal trong thư mục project và chạy lệnh, hoặc có thể sử dụng app claude chế độ cowork:

  

  

```bash

  

claude

  

```

  

  

Với Codex, mở terminal trong thư mục project và chạy lệnh, hoặc sử dụng app codex:

  

  

```bash

  

codex

  

```

  

  

Nếu bạn chưa cài Claude Code hoặc Codex, hãy nhờ AI hướng dẫn:

  

  

```text

  

Hãy hướng dẫn tôi cài Claude Code hoặc Codex để dùng với project Remotion này.

  

Tôi dùng macOS/Windows và không rành kỹ thuật.

  

```

  

  

## 5. Nhờ AI Cài Project

  

  

Sau khi mở AI coding tool trong thư mục project, hãy yêu cầu AI đọc hướng dẫn trước:

  

  

```text

  

Read AGENTS.md first.

  

  

Install the npm packages for this Remotion project and make sure it can run locally.

  

If something fails, explain the error in simple language and fix it if possible.

  

```

  

  

Nếu muốn viết tiếng Việt:

  

  

```text

  

Đọc file AGENTS.md trước.

  

  

Hãy cài các package npm cho project Remotion này và kiểm tra project có chạy được trên máy tôi không.

  

Nếu có lỗi, hãy giải thích đơn giản và sửa nếu có thể.

  

```

  

  

Thông thường AI sẽ chạy lệnh:

  

  

```bash

  

npm  install

  

```

  

  

Sau đó AI có thể chạy:

  

  

```bash

  

npm  run  dev

  

```

  

  

## 6. Mở Remotion Studio

  

  

Khi chạy:

  

  

```bash

  

npm  run  dev

  

```

  

  

Terminal sẽ hiện một đường link, thường là:

  

  

```text

  

http://localhost:3000

  

```

  

  

Mở link đó trong trình duyệt. Đây là **Remotion Studio**, nơi bạn xem thử video.

  

  

## 7. Tạo Video Mới Bằng AI

  

  

Bạn không cần tự tạo file. Hãy mô tả video bạn muốn cho AI.

  

  

Prompt mẫu:

  

  

```text

  

Read AGENTS.md first.

  

  

Create a new vertical short video about [CHỦ ĐỀ VIDEO].

  

  

Audience: [AI SẼ XEM VIDEO]

  

Style: [PHONG CÁCH MONG MUỐN]

  

Length: around 10 to 15 seconds

  

Format: 1080x1920, 30fps

  

  

Use the existing project structure and design system.

  

Add the new video under src/projects.

  

Register it in src/Root.tsx.

  

When finished, tell me the composition ID, preview command, and render command.

  

```

  

  

Ví dụ cụ thể:

  

  

```text

  

Read AGENTS.md first.

  

  

Create a new vertical short video about how AI helps small business owners save time.

  

  

Audience: Vietnamese small business owners who are not technical

  

Style: friendly, modern, simple, and easy to understand

  

Length: around 12 seconds

  

Format: 1080x1920, 30fps

  

  

Use bold typography, simple animations, and clear visual storytelling.

  

Add the new video under src/projects.

  

Register it in src/Root.tsx.

  

When finished, tell me the composition ID, preview command, and render command.

  

```

  

  

Bạn cũng có thể viết tiếng Việt:

  

  

```text

  

Đọc AGENTS.md trước.

  

  

Tạo một video dọc ngắn về chủ đề AI giúp chủ shop nhỏ tiết kiệm thời gian như thế nào.

  

  

Người xem là người Việt không rành kỹ thuật.

  

Phong cách thân thiện, hiện đại, dễ hiểu.

  

Độ dài khoảng 12 giây.

  

Video dạng dọc 1080x1920, 30fps.

  

  

Dùng cấu trúc có sẵn của project.

  

Thêm video mới vào thư mục src/projects.

  

Đăng ký video trong src/Root.tsx.

  

Khi làm xong, cho tôi biết composition ID, lệnh xem thử, và lệnh xuất video.

  

```

  

  

## 8. Xem Thử Và Sửa Video

  

  

Sau khi AI tạo xong, quay lại Remotion Studio và chọn video mới ở danh sách bên trái.

  

  

Nếu muốn sửa, bạn chỉ cần nói tiếp với AI.

  

  

Ví dụ:

  

  

```text

  

Make the text bigger and easier to read on mobile.

  

```

  

  

Hoặc:

  

  

```text

  

Làm chữ lớn hơn, dễ đọc hơn trên điện thoại.

  

```

  

  

Một số yêu cầu sửa phổ biến:

  

  

- Làm video chậm hơn

  

- Đổi màu nền

  

- Làm chữ lớn hơn

  

- Rút ngắn nội dung

  

- Thêm cảnh mở đầu

  

- Làm animation mượt hơn

  

- Đổi video từ tiếng Anh sang tiếng Việt

  

  

## 9. Xuất Video Cuối Cùng

  

  

Khi đã hài lòng, hãy nhờ AI xuất video:

  

  

```text

  

Render this composition to out/video.mp4.

  

```

  

  

Hoặc tiếng Việt:

  

  

```text

  

Xuất video này ra file out/video.mp4.

  

```

  

  

AI sẽ chạy lệnh dạng như:

  

  

```bash

  

npx  remotion  render  COMPOSITION_ID  out/video.mp4

  

```

  

  

Sau khi xuất xong, video sẽ nằm ở:

  

  

```text

  

out/video.mp4

  

```

  

  

Bạn có thể dùng file này để đăng lên TikTok, YouTube Shorts, Instagram Reels, hoặc dùng trong bài học.

  

  

## 10. Tóm Tắt Quy Trình

  

  

Quy trình đơn giản là:

  

  

1. Cài Node.js

  

2. Tải project về máy

  

3. Mở project bằng Claude Code hoặc Codex

  

4. Nhờ AI chạy `npm install`

  

5. Nhờ AI chạy `npm run dev`

  

6. Mở Remotion Studio

  

7. Mô tả video bạn muốn tạo

  

8. Xem thử, yêu cầu sửa nếu cần

  

9. Xuất video ra `out/video.mp4`

  

  

Nếu không biết làm bước nào, hãy nói với AI:

  

  

```text

  

Read AGENTS.md first and help me run this Remotion project step by step.

  

I am not technical, so explain everything simply.

  

```