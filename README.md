# Task2

RESTful backend for user signup and login, event management, and booking built with nodejs, express, sequelize, and postgreSQL

## API endpoint
Base URL:http://localhost:4000/
1. Signup a user
POST /auth/signup
Create a new user

2. Login a user
POST /auth/login
For login user

3. Get all events
GET /events
Fetech all events

4. Get single event by ID
GET /events/:id
Retrieve event by ID

5. Create a new event (admin)
POST /events
Create a new event

6. Update a event (admin)
PUT /events/:id
Update details of a existing event

7. Delete a event (admin)
DELETE /event/:id
Delete a event by ID

8. Book
Book a ticket for an event
POST /book
Book a seat for a specified event

9. Get all booking for loggedin user
GET /book
Retrieve all booking made by the user

10. Cancel a booking
DELETE /book/:id
Cancel a booking by ID

## Setup
```bash

npm i
npx sequelize db:migrate
npm start
