### Books API

This project demonstrates CRUD operation on a books Store

### Setting up the project locally

- Clone the repo

```
git clone https://github.com/parteekcoder/books-api.git
cd books-api
```

- rename `.sample.env` to `.env`

## Method 1 - If you have docker running locally

- run the following command

```
sudo docker-compose up
```

After this you can access the API at http://localhost:8080/

## Method 2 - If you have mongodb running locally

- Install the dependencies

```
npm install
```
- To start the server

```
npm run start
```

- To Run the test

```
npm run test
```

## Method 3

> Note: Create a remote cluster for mongodb database and replace its connection string in the `.env` with `MONGO_URI`

- Follow the steps in Method 2


## bonus points

- I have created Unit tests for the API
- Created Github Action which will run those unit test on every push to `master` and `dev` branch
- Contanerized Application using docker

## API end points

- Getting a book information by its ID

GET /book/:id

- Creating a book

POST /book

request body: `{"author":"author1","title":"tiitle1","summary":"summary1"}`

> Note: Summary is optional feild here

- Updating an existing book

PUT /book/:id

request body: `{"author":"new_author","title":"title1","summary":"summary1"}`

- Deleting a book

DELETE /book/:id
