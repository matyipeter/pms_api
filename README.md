# Property Management System

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Property Management System is a web application that helps property owners and managers manage their properties, tenants, and leases.

## Features

- User authentication and authorization
- Property management
- Tenant management
- Lease management
- Payment tracking
- Maintenance requests
- Document management

## Technologies

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [JWT](https://jwt.io/)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/matyipeter/pms_api.git
   cd pms_api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Set up database:
    Log in to your PostgreSQL database and run the following command:
   ```bash
   \i db/init.sql
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## Usage

The application provides a REST API for managing properties, tenants, and leases.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

[MIT License](LICENSE)
