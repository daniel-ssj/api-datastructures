# Practicing data structures by building an API

#### Ultilized linked lists, hash tables, binary search trees, stack and queues to perform CRUD operations

1. Install dependencies via `yarn` or `npm install`
2. Create DB schema via `npx mikro-orm schema:create -r`
3. Run via `yarn start` or `npm start`
4. Example API is running on localhost:1469

Available routes:

```
POST    /user                   creates new user
GET     /user/descending_name   gets users by descending name order
GET     /user/ascending_name    gets users by ascending name order
GET     /user/:id               finds user by id
DELETE  /user/:id               deletes user by id
```

```
POST    /blog_post:user_id          creates a blog post
GET     /blog_post/numeric_body     gets all blog posts and turns body into numbers
GET     /blog_post/:id              finds a blog post by id
DELETE  /blog_post/delete_last_10   deletes last 10 blog posts
```

## Technologies

- Typescript
- Express
- MikroORM
- SQLite
