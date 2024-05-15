# Advent5Cal - Online Advent Calendar App

A modern twist to a nostalgic holiday tradition. This repository contains the full stack code for an online advent calendar. Create, share, and manage custom-made advent calendars through a user-friendly frontend, and let the backend handle data storage, authentication, and other services using Firebase and Node.js.

## Table of Contents

- [Features](#features)
- [Frontend](#frontend)
  - [Getting Started](#frontend-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Development Server](#running-the-development-server)
    - [Building for Production](#building-for-production)
    - [Linting](#linting)
  - [Technologies Used](#frontend-technologies-used)
  - [Frontend scripts](#frontend-scripts)
- [Backend](#backend)
  - [Project Folder Structure](#project-folder-structure)
  - [Technologies Used](#backend-technologies-used)
  - [Backend scripts](#backend-scripts)
- [Contributors](#contributors)
- [Acknowledgement](#acknowledgement)
- [License](#license)

## Features

- Create new advent calendars by uploading images
- Save calendars to a Firebase database
- Fetch, share, view, edit, or delete saved calendars
- View a list of all calendars created by the user

## Frontend

The frontend is built using Next.js, React, and Tailwind CSS. It allows users to interact with the app in a seamless and responsive manner.

### Frontend Getting Started

#### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Firebase account for database setup

#### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/johntrehearn/CalendarApp-Team-5.git
cd CalendarApp-Team-5/frontend
npm install
```

#### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will start the Next.js development server. Open your browser and navigate to `http://localhost:3000`.

#### Building for Production

To create an optimized production build, run:

```bash
npm run build
```

To start the production server, run:

```bash
npm start
```

#### Linting

To lint the project files, run:

```bash
npm run lint
```

### Frontend Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [Firebase](https://firebase.google.com/)

### Frontend Scripts

- `dev`: Starts the Next.js development server
- `build`: Builds the application for production
- `start`: Starts the Next.js production server
- `lint`: Lints the project files

## Backend

The backend is built using Node.js, Express, and Firebase Firestore. It handles all the server-side logic, including data storage, authentication, and API endpoint management.

### Project Folder Structure

- **CALENDARAPP-TEAM-5/backend/**
  - **config/**
    - `config.js` - Configuration files (database, environment variables, etc.)
  - **controllers/**
    - `exampleController.js` - Controllers for handling logic
  - **middleware/**
    - `authMiddleware.js` - Middleware functions (authentication, authorization, most likely firebase)
  - **models/**
    - `exampleModel.js` - Data models
  - **routes/**
    - `exampleRoutes.js` - Route definitions for the API endpoints
  - **services/**
    - `exampleService.js` - Service layer for interacting with data models
  - **utils/**
    - **metrics/**
      - `metricsHandler.js` - Handler for metrics collection
    - **logging**
      - `logger.js` - Logger utility for logging messages
    - **errorHandling**
      - `errorHandler.js` - Utility functions for error handling
  - `.gitignore` - Git ignore file
  - `app.js` - Main entry point of the application
  - `package.json` - Project dependencies and metadata
  - `README.md` - Project documentation

### Backend Technologies Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)

#### Installation

Install the dependencies:

```bash
cd CalendarApp-Team-5/backend
npm install
```

### Backend Scripts

To start the server locally, run:

```bash
npm start
```

## Contributors

- [Luke Baart (OGOZ111)](https://github.com/OGOZ111)
- [Kshitiz Khanal (Kshitiz2020)](https://github.com/Kshitiz2020)
- [Dóra Tokai (tdora28)](https://github.com/tdora28)
- [John Trehearn (johntrehearn)](https://github.com/johntrehearn)

## Acknowledgement

This project is a collaborative effort by the students of [Business College Helsinki](https://www.bc.fi/), class REACT23S. It showcases our skills in React, Node.js, Firebase, and more. Thanks to our instructors and classmates for their guidance and support throughout this journey!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
