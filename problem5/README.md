# A Crude Server

## Overview

This project is an Node.js server using ExpressJS, Typescript and Sequelize with MySQL. It provides an API for managing simple products which have name, price and description. This README provides instructions on how to set up and run the application.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>= 14.x)
- npm (>= 6.x)
- MySQL database

## Installation

To install and run the application, follow these steps:

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd problem5
    ```

3.  Install Dependencies:

    ```bash
    npm install
    ```

4.  Configuration:

    ```bash
    cp .env.example .env
    ```

    Add your database configuration in .env file, ensure that your MySQL server is running and create a new database.

5.  Run the Application:

    For Development

    ```bash
    npm run dev
    ```

    For Production

    ```bash
    npm start
    ```

## Project Structure

    .
    ├── src
    │ ├── config
    │ │ └── database.ts
    │ ├── controllers
    │ │ └── resourceController.ts
    │ ├── error
    │ │ └── customError.ts
    │ ├── middleware
    │ │ └── asyncHandler.ts
    │ ├── models
    │ │ └── index.ts
    │ │ └── resource.ts
    │ ├── repositories
    │ │ └── resourceRepository.ts
    │ ├── routes
    │ │ └── index.ts
    │ │ └── resourceRoute.ts
    │ ├── services
    │ │ └── resourceService.ts
    │ └── index.ts
    ├── .env.example
    ├── package.json
    ├── README.md
    └── tsconfig.json

## Usage

After run application successfully, you can access the API at the following URL:

[http://localhost:5000/api-docs/](http://localhost:5000/api-docs/)

## Troubleshooting

If you encounter any issues, please check the following:

- Ensure MySQL is running and the credentials in the .env file are correct.
- Verify that you have created the database specified in the .env file.
- Check the logs for any error messages.
