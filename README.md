# tdd-mooc-exercise-5

*THIS IS A WORK IN PROGRESS*

My solution to exercise 5 in the Test-Driven Development MOOC course. It is a simple To-Do List web application developed using Test-Driven Development.

## Features

* *TBA*

## Technologies used

* **Backend:** [Express](https://expressjs.com) / JavaScript
* **Frontend:** [React](https://react.dev) / JavaScript
* **Database:** [MongoDB](https://www.mongodb.com)
* **E2E tests:** [Playwright](https://playwright.dev)
* **Unit tests:** [Vitest](https://vitest.dev)

## Prerequisites

Install [Node.js](https://nodejs.org/en/download) and [Docker](https://www.docker.com/get-started)

## Starting the application

In the root directory of the project, run the command

    docker compose up -d

The application is then running at [http://localhost:5173](http://localhost:5173). It can be shut down with `docker compose down`

## Running the backend's unit tests

1. Start the test database with `docker compose -f docker-compose.testdb.yaml up -d`
2. Go to the `backend` directory
3. Install dependencies with `npm install`
4. Run the tests with `npm test`

## Running the E2E tests

1. Start the application
2. Go to the `e2e` directory
3. Install dependencies for E2E tests with `npm install`
4. Run the E2E tests with `npm test`
