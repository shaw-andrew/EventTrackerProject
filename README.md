# EventTrackerProject
## Desctiption
This project is a multi-week RESTful project. I created an exercise tracker database in SQL. For the time being it only tracks run distance, but through the week and over next weekend I intend to change things up and add another couple of tables. I think the first table should be users, there should be a transactional table for session, then a workout table so people can populate their session and different users can track multiple workout.

So far I've worked on the back-end creating a Java program that talks to SQL and tested my current endpoints using Postman.

11/13/22 update:
This week I added a Javascript front end and made a dynamic single page front end. I utilized Ajax calls to perform all CRUD operations. Currently they all work, but I'm having issues with my PUT request, where it updates on the page but does not update in the database. I will be getting help to make sure this functionality is operational. I'm looking forward to adding an Angular front end next week.

This project is available at: http://52.32.118.35:8080/ExerciseTracker/.


## Technologies used
Java, Javascript, SQL, REST, Spring Boot, Spring Data, Postman

## Rest Endpoints
| CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/exercises`     |              | List of all exercises |
| Read     | GET       | `/api/exercises/{exerciseId}`|      | Representation of one exercise |
| Create   | POST      | `/api/exercises`     | JSON for new exercise | JSON of created exercises
| Update   | PUT       | `/api/exercises/{exerciseId}`| JSON to update cave | JSON of updated exercise |
| Delete   | DELETE    | `/api/exercises/{exerciseId}`|      | Deletes exercise by ID
