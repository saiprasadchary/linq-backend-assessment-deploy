# Linq Backend Assessment API

## Overview

This repository contains a simple backend service built for the Linq Backend Engineer Assessment. The API allows you to manage contacts and their associated notes. It uses JWT for authentication, provides full CRUD operations for contacts and notes, simulates outbound requests with retry logic, and includes comprehensive API documentation via Swagger.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Design Decisions, Tradeoffs, and Assumptions](#design-decisions-tradeoffs-and-assumptions)
- [Submission](#submission)

## Features

- **JWT Authentication:** Secure login endpoint that generates JSON Web Tokens for protected access.
- **Contacts CRUD:** Endpoints to create, read, update, and delete contacts.
- **Notes CRUD:** Endpoints to manage notes attached to contacts with field normalization (unifying `note_body` and `note_text` into `body`).
- **Outbound Request Simulation:** An endpoint that simulates an external dependency call with retry and exponential backoff logic.
- **API Documentation:** Interactive documentation generated via Swagger.

## Technologies Used

- **Node.js** and **Express** – for building the API server.
- **jsonwebtoken** – for implementing JWT-based authentication.
- **express-validator** – for data validation.
- **swagger-jsdoc** and **swagger-ui-express** – for auto-generating and serving API documentation.
- **In-Memory Storage** – used for demonstration purposes; a persistent database can be substituted in production.

## Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/saiprasadchary/linq-backend-assessment-deploy.git
   cd linq-backend-assessment-deploy
   
