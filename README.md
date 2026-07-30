# ResumeAI

**Live Demo:** [https://resume-builder-six-pi-28.vercel.app](https://resume-builder-six-pi-28.vercel.app)

![ResumeAI](https://via.placeholder.com/1200x600/0f172a/6366f1?text=ResumeAI+-+AI+Powered+Resume+Builder)

ResumeAI is an advanced, premium, completely free-to-use resume builder designed specifically for modern professionals and developers. Built with React and Node.js, and powered by Gemini AI, it helps you craft ATS-optimized, high-converting resumes in minutes.

## ✨ Features

- **Premium Glassmorphism UI**: A breathtaking, responsive, floating workspace design with mesh gradients and floating glass panels.
- **AI Auto-Tailoring**: Integrated with Gemini Flash to automatically tailor your resume skills and summary to match any Job Description.
- **ATS Health Score**: Real-time feedback on how ATS-friendly your resume is, with specific action items for improvement.
- **9 Professional Templates**: Includes Harvard, Executive, Modern, Minimalist, Classic, and a specialized **Developer Dark** theme.
- **Instant PDF Export**: High-quality PDF rendering that guarantees pixel-perfect exports.
- **LaTeX Export**: One-click raw `.tex` generation for developers who want ultimate control over formatting.
- **Real-time Live Preview**: Your changes to fonts, data, and layout instantly reflect on an auto-scaled A4 live preview.

## 🚀 Tech Stack

**Frontend:**
- React 18
- Vite
- Custom CSS (Glassmorphism + Mesh Gradients)
- Tabler Icons

**Backend:**
- Node.js & Express
- MongoDB / Mongoose (User auth & saving resumes)
- Google Generative AI (Gemini Flash)
- JSONWebToken & bcrypt

## 📦 Getting Started (Local Development)

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on `127.0.0.1:27017` or a MongoDB Atlas URI)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### 2. Clone and Install
\`\`\`bash
# Clone the repository
git clone https://github.com/Sourabh-hk/Resume-builder.git
cd Resume-builder

# Install Frontend dependencies
npm install

# Install Backend dependencies
cd server
npm install
\`\`\`

### 3. Environment Variables
Create a `.env` file in the `server` directory:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/resume-builder
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

### 4. Run the Application
You'll need two terminal windows.

**Terminal 1 (Backend):**
\`\`\`bash
cd server
npm start
\`\`\`

**Terminal 2 (Frontend):**
\`\`\`bash
npm run dev
\`\`\`
Navigate to `http://localhost:5173` in your browser.

## 🌐 How to Make this Project Live (Deployment Guide)

To share your project with the world, you need to deploy the database, the backend API, and the frontend app.

### Step 1: Database (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database) and create a free account.
2. Create a new Cluster (the free `M0` tier is perfect).
3. Under "Database Access", create a new user and password.
4. Under "Network Access", add `0.0.0.0/0` to allow access from anywhere (needed for cloud backends).
5. Click "Connect" -> "Drivers" and copy the connection string. Replace `<password>` with your user password.

### Step 2: Backend (Render or Railway)
1. Create a free account on [Render](https://render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub account and select this `Resume-builder` repository.
4. **Important**: 
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Under **Environment Variables**, add:
   - `MONGODB_URI`: (The Atlas URI you copied)
   - `JWT_SECRET`: (A strong random string)
   - `GEMINI_API_KEY`: (Your Google AI API Key)
   - `FRONTEND_URL`: (The URL of your frontend once deployed, e.g., `https://your-app.vercel.app`)
6. Click **Create Web Service** and wait for it to deploy. Copy the deployed backend URL.

### Step 3: Frontend (Vercel or Netlify)
1. Before deploying, you need to tell the frontend where the live backend is. In your Vite project, you likely use `/api` proxying or a hardcoded `localhost:5000`. You must update the frontend API calls to point to your new Render backend URL (e.g., `https://resume-backend.onrender.com`).
2. Go to [Vercel](https://vercel.com/) and connect your GitHub.
3. Import the `Resume-builder` repository.
4. The Build settings should automatically detect Vite (`npm run build`, output directory `dist`).
5. Click **Deploy**.

**Congratulations! Your ResumeAI platform is now live!**

---
*Created by Sourabh and AI.*
