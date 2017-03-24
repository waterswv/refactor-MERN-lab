# MERN comment box app

## Objectives

* Utilize React skills to build a comment box frontend
* Apply Mongo and Express knowledge to build a fully functional MERN app

## Intro

So far, we've delved into basic React app frontend architecture. Now, let's take a stab at a full MERN stack CRUD app!

### What you should already know:

* Basic ES6
* Basic React component syntax and structure
* When to use React `state` and `props`
* MongoDB structure and mongoose methods / syntax
* Express routing
* Node/NPM setup

This guide will walk you through a scaffolded MERN stack app - you'll be focusing mainly on the React part of MERN. Definitely take some time during the lab to check out what's going on in `server.js` and re-familiarize yourself with express routing.


Clone this repo down and take a look at the file structure.

*Note: If you were to create this React app from scratch, you would be using the command create-react-app mern-comment-box.*

By the end of this lesson, your file structure should end up looking like so:

```
- model
  - comments.js
- node_modules
  - ...various modules...
- src
  - Comment.js
  - CommentBox.js
  - CommentForm.js
  - CommentList.js
  - index.js
  - style.js
- .gitignore
- data.js
- index.html
- package.json
- README.md
- server.js
```

You'll need to create the missing files in the `src` directory to build out our front-end React components.

Make sure to run `npm install --save` to install dependencies!

Take a look at `package.json`. What is familiar? What's new?

* Mongoose, express, body-parser, and nodemon should be familiar.
* Axios is a library that will let us use HTTP methods to communicate with our database.
* Foreman allows us to boot up our API and webpack-dev-server simultaneously.

### Part 1: Components!

Let's go ahead and create some components!

We'll need a basic comment box:

```js
//CommentBox.js
import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import DATA from '../data';
import style from './style';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <div style={ style.commentBox }>
        <h2>Comments:</h2>
      <CommentList data={ DATA }/>
      <CommentForm />
      </div>
    )
  }
}

export default CommentBox;
```

Next, let's make a list of comments:

```js
//CommentList.js
import React, { Component } from 'react';
import Comment from './Comment';
import style from './style';

class CommentList extends Component {
  render() {
    let commentNodes = this.props.data.map(comment => {
      return (
        <Comment author={ comment.author } key={ comment.id }>
          { comment.text}
        </Comment>
      )
    })
    return (
      <div style={ style.commentList }>
        { commentNodes }
      </div>
    )
  }
}

export default CommentList;
```

We also need a basic Comment component with an Author and some stylized text:

```js
//Comment.js
import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Comment extends Component {
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div style={ style.comment }>
        <h3>{this.props.author}</h3>
        <span dangerouslySetInnerHTML={ this.rawMarkup() } />
      </div>
    )
  }
}

export default Comment;
```

And finally, we definitely need a form for POSTing:

```js
//CommentForm.js
import React, { Component } from 'react';
import style from './style';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', text: '' };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(`${this.state.author} said "${this.state.text}"`)
    //we will be tying this into the POST method in a bit
  }
  render() {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='Your name...'
          style={ style.commentFormAuthor}
          value={ this.state.author }
          onChange={ this.handleAuthorChange } />
        <input
          type='text'
          placeholder='Say something...'
          style={ style.commentFormText}
          value={ this.state.text }
          onChange={ this.handleTextChange } />
        <input
          type='submit'
          style={ style.commentFormPost }
          value='Post' />
      </form>
    )
  }
}

export default CommentForm;
```

Take a moment to review these components. When is `state` used? when is `props` used? Which components are most associated with which CRUD actions?

Now take a peek at `data.js`. We've provided a few entries for you. Feel free to add some more entries to seed your project.

Go ahead and run `nodemon` and see what we have so far.

### Part 2: The DB

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

### Part 3. Check out the Procfile and serving setup

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

This lets us us `npm run start-dev` from terminal to start both the React app and the API - Neato!

![cat](https://media.giphy.com/media/3oz8xQQP4ahKiyuxHy/giphy.gif)

### Part 4. GET and POST

Time for some CRUD!

Let's re-open `server.js`. You should have some `GET` an `DELETE` routing already scaffolded:

```js
//set route path and init API
router.get('/', function(req,res) {
  res.json({message: 'API Initialized!'});
});

// delete all comments
router.route('/nuke').get(function(req,res){
  Comment.remove(function(err,succ){
  res.json(succ);
  });
});
```

Now let's add some functionality for getting and posting:

```js
//adding the /comments route to our /api router
router.route('/comments')
  //retrieve all comments from the database
  .get(function(req, res) {
    //looks at our Comment Schema
    Comment.find(function(err, comments) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(comments)
    });
  })
  //post new comment to the database
  .post(function(req, res) {
    var comment = new Comment();
    //body parser lets us use the req.body
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
  });
```

Looking good.



This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

* tutorial from https://github.com/bryantheastronaut/mernCommentBox__
