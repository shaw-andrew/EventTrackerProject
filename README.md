# EventTrackerProject
## Desctiption
This project is a multi-week RESTful project. I created an exercise tracker database in SQL. For the time being it only tracks run distance, but through the week and over next weekend I intend to change things up and add another couple of tables. I think the first table should be users, there should be a transactional table for session, then a workout table so people can populate their session and different users can track multiple workout.

So far I've worked on the back-end creating a Java program that talks to SQL and tested my current endpoints using Postman.

## Technologies used
Java, SQL, REST, Spring Boot, Spring Data, Postman

## Rest Endpoints
| CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/exercises`     |              | List of all exercises |
| Read     | GET       | `/api/exercises/{exerciseId}`|      | Representation of one exercise |
| Create   | POST      | `/api/exercises`     | JSON for new exercise | JSON of created exercises
| Update   | PUT       | `/api/exercises/{exerciseId}`| JSON to update cave | JSON of updated exercise |
| Delete   | DELETE    | `/api/exercises/{exerciseId}`|      | Deletes exercise by ID
