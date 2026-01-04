# 🎨 AI Gesture Whiteboard

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) ![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=flat&logo=opencv&logoColor=white)

> An interactive whiteboard application that magically transforms your hand gestures into digital art using AI.

## 🌟 Overview

**AI Gesture Whiteboard** leverages the power of computer vision to create a touchless drawing experience. By tracking hand movements in real-time, it allows users to draw and create shapes on a digital canvas simply by moving their fingers in the air.

Built with **React** for the frontend, **Node.js** for the backend, and **OpenCV & MediaPipe** for the AI processing engine.

## 🚀 Key Features

*   **Real-time Hand Tracking**: Precision tracking using MediaPipe.
*   **Gesture Recognition**: Detects "Draw" gestures and specific shapes.
*   **Instant Shape Rendering**: Automatically perfects circles and rectangles.
*   **Low Latency**: Optimized Socket.IO communication for smooth drawing.

## 🛠️ Tech Stack

*   **Frontend**: React, Canvas API
*   **Backend**: Node.js, Express, Socket.IO
*   **AI Engine**: Python, OpenCV, MediaPipe, Python-SocketIO

## 📦 Installation & Usage

### 1. Client & Server (JavaScript)

Start the web application and the websocket server.

```bash
# Install dependencies for both client and server
npm install

# Run both in development mode
# Open two terminals or run sequentially if needed
cd client && npm run dev
cd server && npm run dev
```

### 2. AI Engine (Python)

Set up the computer vision engine.

```bash
# Navigate to the AI engine directory
cd ai-engine

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Start the AI Tracker
python src/main.py
```

## 📂 Project Structure

```bash
AI_GESTURE_WHITEBOARD
├── 🧠 ai-engine           # Python-based Computer Vision Logic
│   ├── src
│   │   ├── gestures.py
│   │   ├── hand_tracker.py
│   │   ├── main.py
│   │   ├── shape_detector.py
│   │   └── websocket_client.py
│   ├── requirements.txt
│   └── README.md
│
├── 💻 client              # React Frontend
│   ├── src
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   ├── App.tsx
│   │   └── index.css
│   └── package.json
│
└── 🔌 server              # Node.js WebSocket Server
    ├── src
    │   ├── index.ts
    │   ├── socket.ts
    │   └── types.ts
    └── package.json
```

## ❤️ Show Your Support

If you find this project interesting, please give it a ⭐️ on GitHub!

Created by **Shubhanshu Upadhyay**