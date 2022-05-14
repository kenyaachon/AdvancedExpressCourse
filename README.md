# AdvancedExpressCourse

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
