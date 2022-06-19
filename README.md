# Web-API-Octoware

The repository content is conformed by the Octoware Web API, used for the communication between the Angular app and the Microsoft SQL Server Database. It was created using ExpressJS, NodeJS and Babel.

### Structure
It consists of controllers and routes, classified with the elements in DB (APIs, Users, Endpoints, Favorites, etc.). A single controller and route could be used, but for a better organization every element has a pair of them.

A file called queries.js has all the SQL queries that the routes use to manipulate the Database. For security, Database has Stored Procedures for every query, so they are not specified explicitly on the queries.js file.

Following the security topic, the API uses environment variables. To generate a successful connection to the Database a .env file must be included.

### Used Libraries
+ google-auth-library
+ jsonwebtoken
+ moment-timezone
+ @babel/core (with -D)
+ @babel/cli (with -D)
+ @babel/preset-env (with -D)
+ @babel/node (with -D)
+ nodemon (with -D)
+ mssql
+ express
+ morgan
+ cors
+ dotenv
