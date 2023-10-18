# Locations Viewer

This Angular-based application is a locations viewer, designed for displaying locations on a map and providing location data in a table. Angular Material styling is integrated for an enhanced user experience. This project serves as a sample work to showcase Angular development practices.

## Table of Contents

-   [Features](#features)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Usage](#usage)

## Features

The application includes the following key features:

1. **Navigation Bar:**

-   Provides easy access to the main routes of the application.

2. **Map Component:**

-   Displays a full-screen map (Google Maps).
-   Supports the display of location markers.
-   A side panel for displaying location details.

3. **Table Component:**

-   Displays all data from the location dataset with pagination.
-   Allows sorting of table columns.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node.js and npm installed on your system. This project requires Node.js version `^16.14.0 || ^18.10.0`
-   Angular CLI installed (`npm install -g @angular/cli`).

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/efsamaras/locations-viewer.git
    ```

2. Install project dependencies:

    ```bash
     npm install
    ```

## Configuration

To configure the application, you need to:

Set up Google Map JavaScript API key in the `src/environments/environment.ts` or `src/environments/environment.prod.ts` files.

To obtain a Google Maps JavaScript API key, you'll need to create a project in the Google Cloud Platform (GCP) Console and enable the Google Maps JavaScript. For more detailed steps, you can refer to the official [Google Maps JavaScript API documentation](https://developers.google.com/maps/get-started#enable-the-api).

## Usage

To start the development server, run:

```bash
npm run start
```

Open your browser and navigate to http://localhost:4200/ to view the application.

For production build, use:

```bash
npm run prod:start
```
