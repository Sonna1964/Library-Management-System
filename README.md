# Library-Management-System
A Library Management System built with React (frontend), C#.NET (backend), SQLite (database), and RESTful APIs.

---

## Features

- **Add Books**
- **Edit Books**
- **Delete Books**

---

## Tech Stack

- **Frontend**: React
- **Backend**: C#.NET
- **Database**: SQLite
- **API**: RESTful API

---

## Prerequisites

Before deploying this project on your local machine, ensure you have:

1. **Node.js** and **npm** installed (for React frontend).
2. **Visual Studio** (or another C#.NET IDE) installed (for backend).
3. **SQLite** installed or pre-configured.
4. **Git** installed to clone the repository.

---

## Installation and Deployment on Local Machine

Follow these steps to deploy the Library Management System on your local machine:


### Step 1: Clone the Repository
```bash
git clone https://github.com/Sonna1964/Library-Management-System.git
cd Library-Management-System
```


### Step 2: Setup the Backend
1. Navigate to the backend directory:
```bash
cd backend
```
2. Open the project in Visual Studio (or your preferred C#.NET IDE).
3. Restore NuGet packages.
4. Configure the SQLite database connection string in the appsettings.json file (if required).
5. Change Api value in line 21 in Program.cs file
```bash                         
policy.WithOrigins("Your frontend localhost URL");
```
7.  Run the backend project to start the API server.


### Step 3: Setup the Frontend
1. Navigate to the frontend directory:
```bash
cd frontend
```
2. Install required dependencies:
```bash
npm install
```
3. Change API value in line no 36, 49, 64, 78, 99 in Book.jsx file
```bash
const url = `https://localhost:7072/api/Book/${editid}`;
```
4. Start the React development server:
```bash
npm run dev
```


### Step 4: Access the Application
- Open your browser and navigate to (default is http://localhost:3000) to access the frontend.
- Ensure the backend is running on the configured port (default is http://localhost:5000).
- Feel free to change you as want.

---



