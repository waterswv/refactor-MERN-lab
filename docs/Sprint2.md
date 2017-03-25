### Sprint 2: The DB

Check out `server.js`. Notice the mongoose connection?

```
//db config
//ADD YOUR INFO HERE!
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds115738.mlab.com:15738/mern-comment-box');
```

You'll need to go to MLabs (https://mlab.com/). Sign up if you haven't already. 

Once you have a username and password, we can integrate it into our server.js file.
On your MLab page, you should see something such as this at the top:

![img4.png](img4.png)

You'll need the "using a driver via the standard MongoDB URI" option. Copy this into your server.js as shown in the code snippet above.

Check out the Comment Schema in Models. 

What are the properties of this? What are their types?
Check to make sure we've required this model in `server.js`.