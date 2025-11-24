# PDM Video Streaming Backend (Group 10)

A simplified video streaming backend system built using:

- Node.js / Express.js / TypeScript  
- Prisma ORM + MySQL  
- JWT Authentication  
- FFmpeg (HLS conversion)  
- Multer for file upload  
- HTML/CSS frontend test interface  

---

## 🚀 Features

✔ User Register / Login  
✔ Upload video using Multer  
✔ Convert to HLS using FFmpeg  
✔ Stream video using HLS.js  
✔ Store metadata using MySQL (Prisma)

---

## 📦 Installation & Run

```bash
# Move to backend folder
cd pdm-backend

# Install dependencies
npm install

# Start development server
npm run dev

📁 Project Structure
pdm-backend/
 ├── src/
 ├── uploads/
 ├── prisma/
 └── package.json

pdm-frontend/
 ├── index.html
 └── player.html

💡 Database Setup (MySQL + Prisma)
cd pdm-backend

# Generate Prisma client
npx prisma generate

# Create tables in MySQL
npx prisma migrate dev --name init

# Reset database (if needed)
npx prisma migrate reset


🧪 Test API (Thunder Client / Postman)
API	Method	Endpoint
Register User	POST	http://localhost:4000/api/auth/register
Login User (JWT)	POST	http://localhost:4000/api/auth/login
Upload Video	POST	http://localhost:4000/api/videos/upload

🧬 Technologies Used
Tech	Purpose
Node.js	Backend runtime
Express.js	Server framework
FFmpeg	Convert video → HLS
Prisma ORM	Database connection
MySQL	Store metadata
HLS.js	Video streaming on frontend

📌 Note

This prototype is created for educational purposes
(International University – Principles of Database Management course).

Future development could include:

User channels

Comments & Likes

Video recommendation system

Cloud storage (AWS S3 / Firebase)

👨‍💻 Authors – Group 10
Name	Role
Phát	Backend + FFmpeg + Prisma
Nam	Backend + Database
Hoàng	Presentation
Tú	Presentation
Nhật	Presentation
Vũ	Frontend UI
Others	Report / Support

📄 License

This project is for educational use only
(International University – VNUHCMC).
Not for commercial deployment.