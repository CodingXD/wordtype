# Getting Started

##### Start UI

```docker
docker build -t ui .
docker run -d -p 5173:5173 ui
```

##### Start Server

```docker
docker build -t server .
docker run -d -p 3000:3000 server
```

##### Start MongoDB

```docker
docker run -d --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo
```

# About

The UI holds 2 screens, one for uploading the text and the other for seeing the insights
A server handling the main logic and computations. The results are stored into mongodb and can be viewed anytime.

## Tech Stack

##### Frontend

React.js

##### Backend

Node.js (With Fastify)

##### Database

MongoDB
