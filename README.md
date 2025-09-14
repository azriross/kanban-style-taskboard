
# Kanban Task Board

A simple Kanban board web application built with **React** (frontend) and **.NET Core 8 LTS** (backend). It allows users to create, edit, delete tasks, and move them between columns (To Do → In Progress → Done). Each task displays creation and update dates.

## Prerequisites

Before running the project, make sure you have installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)  
- npm or yarn  
- [.NET 8 SDK (LTS)](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)  
- Git (for cloning the repo)  
- **Visual Studio 2022 or later** (for .NET backend)  
- **VS Code** (recommended for running and editing the frontend React project) 

## Backend Setup (.NET Core 8)

1. Open the backend project in **Visual Studio** by loading the `KanbanDashboardAPI.sln` file.
Or, if you’re using the terminal:

```bash
cd KanbanDashboardAPI
```

2.  Restore dependencies:
```bash
`dotnet restore` 
```

3.  Run the backend API:
```bash
`dotnet run`
```

4. Once the API starts, open your browser and go to:  
👉 [https://localhost:5001/swagger/index.html](https://localhost:5001/swagger/index.html)

You should see the **Swagger UI** with all available endpoints.

The API will run at `https://localhost:5001` or `http://localhost:5000` by default.

> The backend uses **SQLite** for data storage. On the first run, the database file (`kanban.db`) will be automatically created in the backend project folder, and it will be **pre-populated with sample tasks** so you can immediately see data in the Kanban board. No manual setup is required.

## Frontend Setup (React)

1.  Navigate to the frontend folder:
    ```bash
    `cd KanbanDashboardFE` 
    ```
2.  Install dependencies:
    ```bash
    `npm install` 
    ```
3.  Start the development server:
    ```bash
    `npm run dev` 
    ```
4.  Open your browser at `http://localhost:5173` (or the URL shown in the terminal).

## Usage

-   Click **Add Task** to create a new task.
    
-   Edit or delete tasks using the icons on each card.
    
-   Drag tasks between columns: **To Do**, **In Progress**, **Done**.
    
-   Task creation and update timestamps are displayed at the bottom of each card.
    

## Notes
-   Drag-and-drop is implemented using **[@hello-pangea/dnd](https://github.com/hello-pangea/dnd)**.
   


🚫 This project is for demonstration/review purposes only. Redistribution or reuse of this code is not permitted without explicit permission.

Copyright (c) 2025 azriross