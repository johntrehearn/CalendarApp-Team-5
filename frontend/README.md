# Frontend README

This repository contains the frontend code for an online advent calendar app. Users can create new advent calendars by uploading images into a template. These calendars can be saved to a Firebase database, allowing users to share, view, edit, or delete them later. The app also includes a page where users can see all the calendars they have created so far.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
  - [Linting](#linting)
- [Technologies Used](#technologies-used)
- [Scripts](#scripts)

## Features

- Create new advent calendars by uploading images
- Save calendars to a Firebase database
- Fetch, share, view, edit, or delete saved calendars
- View a list of all calendars created by the user

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Firebase account for database setup

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/frontend.git
cd frontend
npm install
```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will start the Next.js development server. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

To create an optimized production build, run:

```bash
npm run build
```

To start the production server, run:

```bash
npm start
```

### Linting

To lint the project files, run:

```bash
npm run lint
```

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [Firebase](https://firebase.google.com/)

## Scripts

- `dev`: Starts the Next.js development server
- `build`: Builds the application for production
- `start`: Starts the Next.js production server
- `lint`: Lints the project files
