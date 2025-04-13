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

2.	Install Dependencies:
   npm install

3.	Start the Server:
   npm start

The server will run on port 3000 by default. You can change this by setting the PORT environment variable.

4.	Access the API Documentation:
Open your browser and navigate to:    http://localhost:3000/docs
   
   API Endpoints
   
   Authentication
   	•	POST /login
   Generates a JWT token using the provided username.
   
   Request Body:
      
      {
        "username": "yourUserName"
      }
   Response:

      {
        "token": "yourGeneratedJWT"
      }   

•	GET /protected
A protected route that requires a valid JWT token in the Authorization header.
Headers:
      Authorization: Bearer <your-token>


Contacts
	•	POST /contacts
   Create a new contact.
   Request Body:
       {
        "name": "John Doe",
        "email": "john@example.com"
        }

	•	GET /contacts
   Retrieve all contacts.
   	•	GET /contacts/:id
   Retrieve a contact by ID.
   	•	PUT /contacts/:id
   Update an existing contact.
   Request Body:

      {
        "name": "Jane Doe"
      }

	•	DELETE /contacts/:id
Delete a contact.

Notes
•	POST /contacts/:contactId/notes
Create a note for a specific contact. Accepts either note_body or note_text and normalizes it to body.
Request Body Example:

      {
        "note_body": "This is a note for the contact."
      }

	•	GET /contacts/:contactId/notes
 
Retrieve all notes for a given contact.
	•	GET /notes/:id
Retrieve a specific note by ID.
	•	PUT /notes/:id
Update an existing note.
Request Body Example:

      {
        "note_text": "Updated note content."
      }

•	DELETE /notes/:id   
      Delete a note.

Outbound Request Simulation
•	GET /simulate-upstream
Simulates an outbound request to an upstream dependency with retry and exponential backoff logic.
   
Response Example (on success):

      {
        "message": "Upstream request succeeded.",
        "result": {
          "data": "Upstream data received successfully."
        }
      }


Usage

      1.	Authentication:
      Use the /login endpoint to generate a JWT token. Include this token in the Authorization header (formatted as Bearer <token>) when accessing protected routes like /protected.
      
      2.	Interacting with the API:
      Use an API client like Postman or the interactive Swagger UI (accessible at /docs) to test the endpoints.
      
      3.	Note Normalization:
      The service accepts either note_body or note_text and automatically normalizes them to the body field.

Design Decisions, Tradeoffs, and Assumptions

      •	Simplicity: An in-memory storage approach is used    for demonstration purposes. In a production environment, a proper database would be implemented.
      
      •	Security: JWT-based authentication is used; however, the secret key should be stored securely using environment variables in production.
      
      •	Resilience: The outbound request simulation includes a retry mechanism with exponential backoff to handle simulated external API failures.
      
      •	Maintainability: The project structure clearly separates controllers, routes, and middleware, making it easy to extend and maintain.
      
      •	Assumptions: The service targets internal usage, so some production-level features (like advanced logging and extensive validation) have been simplified.
