### Sprint 2: The DB

Check out `server.js`. Notice the mongoose connection?

```
//db config
mongoose.connect('mongodb://localhost/mern-comment-box');
```

That means that mongoose will create a new local database called "mern-comment-box". But we need MongoDB to be running!

Open a new bash terminal window, and type:

``` bash
mongod
```

Leave this process running in the background.

Now, check out the `CommentsSchema` in our models. 

What are the properties of a comment? What are their types?
Check to make sure we've required this model in `server.js`.
