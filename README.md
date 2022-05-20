# AdvancedExpressCourse

sample user: Sarah
blackychan@gmail.com
password hellohello#1

## Express

Used middleware such as body-parser and http-errors

## Authentication

Passport is used for authenticating users against the database

## Database

Used mongodb for storing data
Used moongoose for creating schemas for mongodb

### User Schema

We used email-validator module for ensuring the correct emails were given when a user setups up their account

Passwords are hashed with bcrypt before being placed in the database for security best practices

## Sessions

For storing information about sessions we are using cookies and the express middleware connect-mongo
->The cookies are deleted automatically when the user closes the browser
##Tests
run npm test

## Performance

For improving the performance of the application, user sessions and data are cached in cookies,
We replaced the console.log() with a logger called bunyan which is asynchronous versus console.log() which is a synchronoous function

For testing the performance of the application:
We used the Apache Benchmark tool,
-c concurrency Number of multiple requests to make at a time
-n requests Number of requests to perform

```
ab -c 10 -n 100 http://localhost:3000/
```
