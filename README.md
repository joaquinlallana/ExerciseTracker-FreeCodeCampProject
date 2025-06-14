# Exercise Tracker API

A RESTful API built with Node.js, Express, and MongoDB that allows users to track their exercises. This project is part of the Backend Development certification curriculum.

## Features

- Create and manage users
- Log exercises for each user
- Retrieve exercise logs with filtering options
- Built with modern JavaScript (ES6+)
- Uses MongoDB Atlas for cloud database storage
- Implements CORS for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account or local MongoDB instance
- Git (optional)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/joaquinlallana/ExerciseTracker-FreeCodeCampProject.git
   cd exercise-tracker-api
   
2. Install dependencies:
bash

npm install

3. Create a .env file in the root directory with your MongoDB connection string:
text

MONGO_URI=[Place your database]
PORT=3000

4. Start the server:
```bash

    npm start
```

The server will run on http://localhost:3000 by default.


API ENDPOINTS
--------------------

Create a New User
--
```text
    POST /api/users
```

Request Body:
```json
{
  "username": "john_doe"
}
```

Response:
```json
{
  "username": "john_doe",
  "_id": "507f1f77bcf86cd799439011"
}
```

Get All Users
--
```text
GET /api/users
```
Response:
```json
[
  {
    "username": "john_doe",
    "_id": "507f1f77bcf86cd799439011"
  },
  {
    "username": "jane_doe",
    "_id": "507f1f77bcf86cd799439012"
  }
]
```

Add Exercise
--
```text
POST /api/users/:_id/exercises
```

Request Body:
```json
{
  "description": "Running",
  "duration": 30,
  "date": "2025-05-15"
}
```

Note: Date is optional (defaults to current date)

Response:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "description": "Running",
  "duration": 30,
  "date": "Mon May 15 2025"
}
```

Get Exercise Log
--
```text
GET /api/users/:_id/logs
```

Query Parameters:

    from (optional): Date in YYYY-MM-DD format

    to (optional): Date in YYYY-MM-DD format

    limit (optional): Number of exercises to return

Example Request:
```text
  GET /api/users/507f1f77bcf86cd799439011/logs?from=2025-05-01&to=2025-05-31&limit=5
```
Response:
```json

{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "count": 3,
  "log": [
    {
      "description": "Running",
      "duration": 30,
      "date": "Mon May 15 2025"
    },
    {
      "description": "Swimming",
      "duration": 45,
      "date": "Wed May 18 2025"
    },
    {
      "description": "Cycling",
      "duration": 60,
      "date": "Fri May 20 2025"
    }
  ]
}
```

Testing the API
--

You can test the API using:

    Postman

    Insomnia

    curl commands

    The included frontend interface at http://localhost:3000

Example curl commands:
```bash

# Create user
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"username":"test_user"}'

# Add exercise
curl -X POST http://localhost:3000/api/users/507f1f77bcf86cd799439011/exercises -H "Content-Type: application/json" -d '{"description":"Running","duration":30,"date":"2025-05-15"}'

# Get logs
curl http://localhost:3000/api/users/507f1f77bcf86cd799439011/logs?from=2025-05-01&to=2025-05-31
```
Project Structure
```text

exercise-tracker-api/
├── models/
│   ├── users.js          # User model
│   └── exercise.js       # Exercise model
├── views/
│   └── index.html        # Frontend interface
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── README.md             # This file
└── server.js             # Main application file
```

License
--
This project is licensed under the MIT License.

Acknowledgments
--
    FreeCodeCamp Backend Curriculum

    MongoDB documentation

    Express.js documentation