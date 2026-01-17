# Twitter Backend (Node.js)

A scalable backend system for a Twitter-like social media platform built using **Node.js**, **Express**, and **MongoDB**.  
This project focuses on clean architecture, testability, and core social-media features.

---

## Features

### Posts / Tweets
- Users can create posts (tweets)
- Tweet length limited to **250 characters**
- Supports **image uploads**
- Tweets can contain **hashtags**
- **Retweet** functionality supported
- Tweets are visible to **followers of the author**
- **Pagination** supported on tweets

---

### Likes & Comments
- Followers can **like** a tweet
- Followers can **comment** on a tweet
- Comments can have **nested comments**
- Likes are supported on **comments** as well

---

### User Features
- User authentication (signup & login)
- User search functionality
- User profile includes:
  - Name
  - Bio
  - Follower count
  - Last **10 tweets**

---

### Authentication
- Secure user authentication
- Protected routes for actions like posting, liking, commenting

---

## Tech Stack

```text
Backend      : Node.js, Express.js
Database     : MongoDB, Mongoose
Testing      : Jest
Auth         : JWT
Architecture : MVC + Repository Pattern
```
---

## Project Structure

```code
src/
├── controllers/
├── services/
├── repository/
├── models/
├── routes/
├── config/
└── index.js

tests/
├── controllers/
├── services/
├── repository/
└── mocker.js
```

---

## Testing

- Unit tests written using Jest
- Tests cover:
    - Controllers
    - Services
    - Repositories
- Database calls are mocked
- Coverage reports are generated but ignored from Git

Run tests:

```code
npm test
```

Run coverage:

```code
npm run test:coverage
```


