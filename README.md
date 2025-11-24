---

## 📌 System Architecture (Project Flow)
Below is the simplified flow of our video upload & streaming process:


**Process Overview**
1. User uploads a video file from the frontend.
2. Backend receives the file using **Multer**.
3. FFmpeg automatically converts it to **HLS (.m3u8 + .ts segments)**.
4. Converted files are stored in **local storage**.
5. Metadata is stored using **Prisma ORM + MySQL**.
6. Frontend test page streams the video using **HLS.js**.

---

## 🗄 Database Schema (MySQL + Prisma)

Example tables used in our project:
- Video
- User
- ViewingHistory
- Playlist (not implemented yet – future feature)

SQL Export File: **VDStreamingDTB.sql**

---

## 🔑 API Usage Guide

### Register User (POST)
```bash
POST http://localhost:4000/api/auth/register
{
  "username": "demo",
  "email": "demo@gmail.com",
  "password": "123456"
}
Upload Video (POST – Thunder Client / Curl)

curl -X POST http://localhost:4000/api/videos/upload \
 -F "title=My first video" \
 -F "video=@/Users/youruser/Downloads/sample.mp4"


🧪 Demo Screenshots
Action	Image
Successful Register	Figure12
Successful Login	Figure13
FFmpeg HLS Conversion	Figure14
HTML/CSS Interface	Figure15
Play Video with HLS.js	Figure16

(You can upload images into /figures/ folder and link here)

🚀 Future Development

✔ React / Next.js frontend
✔ Admin Dashboard
✔ User Profile / Avatar
✔ Video Recommendation System
✔ Deploy on AWS / DigitalOcean

👨‍👩‍👧‍👦 Contributors (Group 10)
Member	Role	Contribution
You (Leader)	Backend + HLS + Report	25%
Member 2	Database	8.33%
Member 3	Test frontend	8.33%
Member 4	Presentation	8.33%
Member 5–10	Research / Support	8.33% each