# Movie Quiz
## Description
Movie Quiz is a web and mobile based application that allows a user to play through a series of movie-based quizzes. Each correctly answered question will increase a user's score. The faster you answer, the more points you get. Users can choose from a variety of genres to be quizzed on. 

## Project Links
Link | Ver | Description
--- | --- | ---
<a href="https://github.com/plethargy/movie-quiz/blob/dev/documentation/Movie_Quiz_Brief_SRS.pdf" target="blank">SRS</a> | 1.0 | System requirements specification

## Getting started
This section will provide a detailed explanation on the processes to follow if you would like to help develop or run our project.

### Prerequisites
The application is written using the MEAN stack. Thus in order to execute the project you need **Angular** and **NodeJS** installed.

### Installing
In order to install the necessary files, you will need to first clone the repo. Once this is done browse to the movie-quiz/backend folder, open up a terminal and run the following command: ``` npm install ```

Once you have completed this, browse to the movie-quiz/backend folder, open up a terminal and run the following command: ``` npm install ```
Now you should have all the necessary files to execute.

### Executing
To execute the project, you will need to first run the server. To do this, browse to the movie-quiz/backend folder and open a terminal. Now run the following command: ``` node server.js ```
Once you've done that, browse to the movie-quiz/frontend folder and run the following command: ``` npm start ```
You should now be able to access the website by browsing to localhost:4200.


### Testing
In order to execute the unit tests, you will first need to install the required testing modules. To do this, browse to the movie-quiz/backend folder and run the following command: ``` npm install ```
Once this is installed, you can run the tests by executing the following command: ``` npm test ```


## API
### Users

**Retrieve user list:**
```http
GET localhost:5000/user
```

**Response:**
```javascript
{
  "status" : boolean,
  "result" : [
      { 
      "name" : string
      "score" : integer
      }
  ]
}
```

**Create new user:**
```http
POST localhost:5000/user/create
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Required**. The user's unique name. |
| `password` | `string` | **Required**. The user's password. |

**Response:**
```javascript
{
  "status" : boolean,
  "result" : string
}
```

**Authenticate user:**
```http
POST localhost:5000/user/login
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Required**. The user's unique name. |
| `password` | `string` | **Required**. The user's password. |

**Response:**
```javascript
{
  "status" : boolean,
  "result" : {
    "name" : string,
    "score" : integer
  }
}
```

**Update user score:**
```http
POST localhost:5000/user/update
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Required**. The user's unique name. |
| `score` | `integer` | **Required**. The user's new score. |

**Response:**
```javascript
{
  "status" : boolean,
  "result" : {
    "name" : string,
    "score" : integer
  }
}
```


## Authors
The Authors of this software are the Syntactic Sugar Derivco Winter School team. A full list of [contributors](https://github.com/plethargy/movie-quiz/graphs/contributors) can be seen by clicking the link.
