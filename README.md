# Camper Voting
Web application to create polling questions and visualize the results.

## User Story
Here are the specific user stories implemented for this project:

1. As an authenticated user, I can keep my polls and come back later to access them.
1. As an authenticated user, I can share my polls with my friends..
1. As an authenticated user, I can see the aggregate results of my polls.
1. As an authenticated user, I can delete polls that I decide I don't want anymore.
1. As an authenticated user, I can create a poll with any number of possible items.
1. As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
1. As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
1. As an authenticated user, if I don't like the options on a poll, I can create a new option.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Things you need to install to run the app:

- Node
- MongoDB

### Installing

Get the repository

```
git clone https://github.com/roxroy/camper-voting.git
cd camper-voting
npm install
```

Make a copy of `env.example` as `.env`
```
cp env.example .env
```

In a new terminal, go to the project folder, create a data folder and start mongo
```
mkdir data
mongod --dbpath=./data
```

In a new terminal, go to the project folder (folder with server.js) and run the following:
```
npm run start
```

Access the app through the browser, http://localhost:3000.


## Deployment

Release build is optimized for deployment to Heroku and MLab. Don't forget to set environment variables on Heroku from .env.

## Built With

* [MongoDB](https://www.mongodb.com/) - NoSQL database
* [Express.js](https://expressjs.com/) - Web application framework
* [Node.js](https://nodejs.org/en/) - Platform for network applications
* [Vue.js](https://vuejs.org/) - JavaScript View Layer Framework

## Contributing

Please open any issues that you encounter on [the GitHub repo issue page](https://github.com/roxroy/camper-voting/issues).

## Authors

* **Roxroy** - [roxroy](https://github.com/roxroy)


## Acknowledgments

* Hat tip to anyone who's code was used
* [Readme template used](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
