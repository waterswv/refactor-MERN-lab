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

### Components!

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

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

* tutorial from https://github.com/bryantheastronaut/mernCommentBox__
