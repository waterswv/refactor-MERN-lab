### Sprint 3. Check out the Procfile and serving setup

Notice the contents of your Procfile:

```
//Procfile
web: react-scripts start
api: nodemon server.js
```

This allows us to use Foreman properly for our scripts.

Check out how we've set up what to serve in our package.json:

```
//package.json
//...
    "start": "react-scripts start",
    "start-dev": "nf start -p 3000",
//...
```

This lets us use `npm run start-dev` from terminal to start both the React app and the API. - Neato!

So from now on in this tutorial, run `npm run start-dev` from terminal to start your app and the API.

![cat](https://media.giphy.com/media/3oz8xQQP4ahKiyuxHy/giphy.gif)
