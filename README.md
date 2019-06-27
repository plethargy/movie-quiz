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
### User

**Description**
The User API deals largely with CRUD operations relating to users on the system.

**Retrieve user list:**
This returns a list of the top 25 Users in the system (based on score).
```http
GET /user
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
This creates a new user on the system.
```http
POST /user/create
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
This is the login end of the API and authenticates whether a given username and password combo are authentic.
```http
POST /user/login
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
This will update the score of a user on the system. If the given score is not greater than their previous score, no update will be made.
```http
POST /user/update
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

### Questions

**Retrieve questions from category:**
This will receive all questions that are related to a specific category.
```http
GET /questions/:id
```
**Response:**
```javascript
{
  "status" : boolean,
  "results" : [
    {
      "choice1": [
        string,
        boolean
      ],
      "choice2": [
        string,
        boolean
      ],
      "choice3": [
        string,
        boolean
      ],
      "question": string,
      "category": integer,
      "image": string
    }
  ]
}
```

**Creating a new question:**
This will create a new question in the database and link it to a specific category.
```http
POST /questions/create
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `question` | `string` | **Required**. The full question. |
| `choice1` | `array` | **Required**. A 2 index array of string and boolean. The first index is the choice shown and the second index is a true or false value depicting whether the choice is correct or not. |
| `choice2` | `array` | **Required**. A 2 index array of string and boolean. The first index is the choice shown and the second index is a true or false value depicting whether the choice is correct or not. |
| `choice3` | `array` | **Required**. A 2 index array of string and boolean. The first index is the choice shown and the second index is a true or false value depicting whether the choice is correct or not. |
| `category` | `integer` | **Required**. The category ID that the question corresponds to. |
| `image` | `string` | **Required**. The image name of the image corresponding to the question. |


**Response:**
```javascript
{
  "status" : boolean,
  "results" : [
    {
      "choice1": [
        string,
        boolean
      ],
      "choice2": [
        string,
        boolean
      ],
      "choice3": [
        string,
        boolean
      ],
      "question": string,
      "category": integer,
      "image": string
    }
  ]
}
```

**Deleting a question:**
This will remove a question from a given category.
```http
POST /questions/delete
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `category` | `integer` | **Required**. The category ID that the question corresponds to. |


### Category

**Retrieving categories:**
This will return a list of all categories in our database.
```http
GET /category
```

**Response:**
```javascript
{
  "status": true,
  "results": [
    {
      "category": string,
      "id": integer
    }
  ]
}
```

## Authors
The Authors of this software are the Syntactic Sugar Derivco Winter School team. A full list of [contributors](https://github.com/plethargy/movie-quiz/graphs/contributors) can be seen by clicking the link.
