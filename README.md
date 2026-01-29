# 🌱 Atamagri - Smart Agricultural Drone Management System

<div align="center">

![Atamagri Banner](https://img.shields.io/badge/Atamagri-Smart%20Agriculture-green?style=for-the-badge&logo=leaf)

**Transform your farming with AI-powered drone technology**

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11.9-orange?style=flat&logo=firebase)](https://firebase.google.com/)
[![Python](https://img.shields.io/badge/Python-FastAPI-green?style=flat&logo=python)](https://fastapi.tiangolo.com/)

[Live Demo](#) • [Features](#-features) • [Getting Started](#-getting-started) • [Documentation](#-documentation)

</div>

---

![alt text](https://github.com/Alfaashh/Atamagri-v2/blob/master/img/dashboard.png?raw=true)

## 📋 Overview

**Atamagri** is a cutting-edge web application designed to revolutionize modern agriculture through intelligent drone management and AI-powered crop monitoring. Built with Next.js and Firebase, it provides real-time monitoring, automated disease detection, and comprehensive farm management tools for precision agriculture.

### 🎯 Key Highlights

- 🚁 **Real-time Drone Control** - Monitor and control agricultural drones with live telemetry
- 🤖 **AI-Powered Plant Disease Detection** - Automated crop health analysis using deep learning
- 📊 **Advanced Analytics Dashboard** - Comprehensive insights into farm operations
- 🌦️ **Weather Integration** - Real-time weather data for optimal farming decisions
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔥 **Firebase Backend** - Real-time data synchronization and secure authentication

---

## ✨ Features

### 🚁 Drone Management
- **Live Telemetry Monitoring**: Real-time battery, signal strength, and GPS tracking
- **Flight Control**: Intuitive controls for takeoff, landing, and navigation
- **Multiple Drone Support**: Manage and monitor multiple drones simultaneously
- **Flight History**: Comprehensive logs of all flight operations

### 🌾 Crop Health Monitoring
- **AI Disease Detection**: Automatic identification of plant diseases and pests
- **Confidence Scoring**: Prediction accuracy metrics for reliable diagnostics
- **Visual Recognition**: Real-time image processing from drone cameras
- **Historical Analysis**: Track crop health trends over time

### 📊 Analytics & Insights
- **Environmental Monitoring**: Temperature, humidity, soil moisture, and weather tracking
- **Data Visualization**: Interactive charts and graphs powered by Recharts
- **Performance Metrics**: Comprehensive farm productivity analytics
- **Predictive Analytics**: AI-driven recommendations for optimal farming

### 💼 User Management
- **Secure Authentication**: Firebase-powered login and user management
- **Role-Based Access**: Different permission levels for team members
- **Profile Management**: Customizable user profiles and preferences

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15.2](https://nextjs.org/) with React 19
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom theme
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Hooks

### Backend
- **API**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Database**: [Firebase Realtime Database](https://firebase.google.com/)
- **Authentication**: Firebase Auth
- **AI/ML**: PyTorch for disease detection
- **Computer Vision**: OpenCV

### DevOps
- **Package Manager**: pnpm
- **Deployment**: Azure Static Web Apps
- **Version Control**: Git

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **Python** (v3.8+ for backend)
- **Firebase Account** (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/atamagri-v2.git
   cd atamagri-v2
   ```

2. **Install frontend dependencies**
   ```bash
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements-backend.txt
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   
   Frontend:
   ```bash
   pnpm dev
   ```
   
   Backend (in a separate terminal):
   ```bash
   cd backend
   uvicorn drone_api:app --host 0.0.0.0 --port 8000 --reload
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
atamagri-v2/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Main dashboard page
│   ├── login/             # Authentication pages
│   ├── about/             # About page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── drone-control.tsx # Drone control interface
│   └── theme-provider.tsx # Theme management
├── backend/              # Python FastAPI backend
│   ├── drone_api.py     # API endpoints
│   └── requirements-backend.txt
├── hooks/               # Custom React hooks
├── lib/                # Utility functions
│   ├── firebase.ts     # Firebase configuration
│   └── utils.ts        # Helper functions
├── types/              # TypeScript type definitions
├── public/             # Static assets
└── styles/             # Global styles
```

---

## 📱 Features Showcase

### Dashboard
The main dashboard provides a comprehensive view of your agricultural operations:
- Real-time environmental data (temperature, humidity, soil conditions)
- Drone fleet status and telemetry
- Recent activity feed and notifications
- Quick action buttons for common tasks

### Drone Control
Intuitive interface for managing your agricultural drones:
- Live video feed from drone cameras
- Battery level and signal strength indicators
- Flight controls (takeoff, land, navigate)
- AI disease detection results in real-time

### Analytics
Deep insights into your farm's performance:
- Historical data trends and patterns
- Crop health metrics over time
- Weather correlations with crop performance
- Predictive analytics for yield optimization

---

## 🔒 Security

- Firebase Authentication for secure user access
- Environment variables for sensitive data
- CORS protection on API endpoints
- Role-based access control
- Secure data transmission

---

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Project Link**: [https://github.com/yourusername/atamagri-v2](https://github.com/yourusername/atamagri-v2)

**Live Demo**: [https://your-deployment-url.com](https://your-deployment-url.com)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Firebase](https://firebase.google.com/) - Backend infrastructure
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework

---

<div align="center">

**Built with ❤️ for modern agriculture**

⭐ Star this repository if you find it helpful!

</div>
