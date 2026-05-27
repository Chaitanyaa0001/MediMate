# 🩺 Medimate

Medimate is a comprehensive healthcare platform designed to connect patients with doctors, provide medical insights, and empower users to manage their health proactively. It facilitates doctor registration and profile display for patient bookings, allows doctors to publish blogs, and offers an Open FDA API for medicine information. Patients can leverage an AI chatbot (Google Gemini) for conversations and track vital signs (heart rate, BP, oxygen) via Google Fit API integration. The platform also includes Google Authentication for secure access.

## 🌐 Live Demo
[https://medi-mate-delta.vercel.app/](https://medi-mate-delta.vercel.app/)

## ✨ Features
- 🩺 Doctor Registration & Profile Management
- 🗓️ Patient Appointment Booking
- ✍️ Doctor Blogging Platform
- 💊 Medicine/Drug Information Lookup (Open FDA API)
- 🤖 AI Chatbot for Health Queries (Google Gemini API)
- ❤️ Health Tracking (Google Fit API integration for Heart Rate, BP, Oxygen Level)
- 🔒 Secure Google Authentication

## 🚀 Tech Stack
**Frontend:** React.js, JavaScript
**Backend:** Node.js, Express.js
**Database:** MongoDB
**APIs:** Google Fit API, Google Gemini API, Open FDA API
**Authentication:** Google Authentication

## ⚙️ Installation

To get Medimate up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/medimate.git
    cd medimate
    ```

2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Set up environment variables:**
    ```bash
    # Create a .env file in the 'backend' directory with your configurations
    # e.g., MONGODB_URI=your_mongo_uri, GOOGLE_CLIENT_ID=your_google_id, GOOGLE_CLIENT_SECRET=your_google_secret, etc.
    ```

5.  **Start the backend server:**
    ```bash
    cd backend
    npm start
    ```

6.  **Start the frontend development server:**
    ```bash
    cd ../frontend
    npm start
    ```

## 💡 Usage / How it Works

Medimate serves as a central hub for healthcare interactions. Doctors can register and manage their profiles, which are then visible to patients for appointment bookings. They can also share medical insights through blog posts. Patients have access to a robust set of tools: they can search for medicine and drug information using the Open FDA API, engage with an AI-powered chatbot (Google Gemini API) for queries, and monitor personal health metrics like heart rate, blood pressure, and oxygen levels through integration with the Google Fit API. Secure access is provided via Google Authentication, ensuring a seamless and private user experience for both doctors and patients.

## 📂 Folder Structure

```
.
├── backend/
│   ├── src/
│   │   ├── models/           # Mongoose models for data schemas
│   │   ├── controllers/      # Logic for handling requests
│   │   ├── routes/           # API routes definitions
│   │   ├── utils/            # Utility functions
│   │   └── app.js            # Express application setup
│   ├── .env                  # Environment variables
│   └── package.json          # Backend dependencies
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page-level React components
│   │   ├── services/         # API interaction logic
│   │   ├── contexts/         # React Context for global state
│   │   ├── App.js            # Main React application component
│   │   └── index.js          # React entry point
│   ├── package.json          # Frontend dependencies
│   └── .env                  # Frontend environment variables
└── README.md
```

## 🤝 Contributions

We welcome contributions from the community! To contribute to Medimate, please follow these steps:

1.  Fork the repository
2.  Clone your fork: `git clone https://github.com/your-username/medimate.git`
3.  Create a new branch: `git checkout -b feature/your-feature-name`
4.  Make your changes and commit them: `git commit -m 'feat: Add some feature'`
5.  Push to the branch: `git push origin feature/your-feature-name`
6.  Submit a pull request

## 🔮 Upcoming Features

- 📅 Enhanced Appointment Scheduling System
- 💬 Real-time Doctor-Patient Chat
- 📊 Advanced Health Analytics Dashboards for Patients
- 🧑‍⚕️ Telemedicine Capabilities (Video Consultations)
- 📝 Prescription Management System

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 📧 Contact

chaitanya khurana
chaitanyakhurana.workk@gmail.com

❤️ This README was written by **ReadmeAI** for fast and professional documentation.
