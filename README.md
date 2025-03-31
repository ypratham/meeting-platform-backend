# Meeting Platform Backend

An Express.js server providing WebRTC signaling via Socket.IO for the Meeting Platform.

## Overview

This repository contains the backend code for a video conferencing platform that facilitates real-time communication between users. The server manages WebRTC signaling using Socket.IO and provides API endpoints for user and room management.

## Features

- WebRTC signaling server using Socket.IO
- Persistent storage for meeting history

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **Socket.IO**: Real-time bidirectional event-based communication

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/meeting-platform-backend.git

# Navigate to the project directory
cd meeting-platform-backend

# Install dependencies
npm install
```

### Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will be available at `http://localhost:5000`.
