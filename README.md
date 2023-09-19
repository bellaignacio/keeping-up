# Keeping Up

Keeping Up is an Instagram-inspired site where users can share their current activities in the form of to-do lists or bucket lists (think: "If Instagram and your typical to-do list application had a baby").
The goal of sharing these lists among your friends, family, or the public (a.k.a. your followers) is to create an environment of accountability and encouragement to *keep up* with your ambitions - no matter how big or small...

**Live Site:** [Keeping Up](https://keeping-up.onrender.com/)

**Created By:** [Aurora Ignacio](https://github.com/bellaignacio)

**Technologies Used:** [Python](https://docs.python.org/3/) | [JavaScript](https://devdocs.io/javascript/) | [PostgreSQL](https://www.postgresql.org/docs/) | [Flask](https://flask.palletsprojects.com/en/2.3.x/) | [SQLAlchemy](https://docs.sqlalchemy.org/en/20/) | [React](https://react.dev/) | [Redux](https://redux.js.org/) | [Amazon Web Services S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)

## Design Documentation

* [Current & Future Features](https://github.com/bellaignacio/keeping-up/wiki/Feature-List)
* [React Components](https://github.com/bellaignacio/keeping-up/wiki/React-Components)
* [Redux Store](https://github.com/bellaignacio/keeping-up/wiki/Redux-Store)
* [User Stories & Frontend Routes](https://github.com/bellaignacio/keeping-up/wiki/User-Stories)
* [Backend API Documentation](https://github.com/bellaignacio/keeping-up/wiki/Backend-Routes)
* [Database Schema](https://github.com/bellaignacio/keeping-up/wiki/Database-Schema)

## How to build & run the project locally:

 1. Clone this GitHub repository [bellaignacio/keeping-up](https://github.com/bellaignacio/keeping-up) onto your local machine.
 2. Set up your own AWS S3 Bucket.
 3. Create a `.env` file inside the root directory with the proper settings for your development environment. See the `example.env` file.
 4. Inside the root directory, run the following command to install Python dependencies
	```
	pipenv install -r requirements.txt
	```
 5. Inside the react-app directory, run the following command to install JavaScript dependencies
	```
	 npm install
	```
 6. Inside the root directory, run the following command to create and seed the database, and start up the backend server
	```
	pipenv shell && flask db init && flask db migrate && flask db upgrade && flask seed all && flask run -p 3000
	```
7. Inside the react-app directory, run the following command to start up the frontend server
	```
	npm start
	```

## Site Screenshots

### Sign Up Page
![Sign Up Page](/react-app/public/signup.gif)

### Login Page
![Login Page](/react-app/public/login.png)

### Home Page
![Home Page](/react-app/public/home.gif)

### Search Feature
![Search Feature](/react-app/public/search.gif)

### Profile Page
![Profile Page](/react-app/public/profile.png)

### List Page
![List Page](/react-app/public/list.gif)

### Create List Page
![Create List Page](/react-app/public/create_list.gif)

### Edit List Page
![Edit List Page](/react-app/public/edit_list.gif)

## Implementation Details

* Anything you had to stop and think about before building
* Descriptions of particular challenges
* Snippets or links to see code for these
