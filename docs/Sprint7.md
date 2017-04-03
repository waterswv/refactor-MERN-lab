## Sprint 7: Using a real backend

If we wanted to deploy to Heroku, we'd actually want to hook up our React app to a separate backend, instead of just running Mongo locally. In other words, we'd have TWO Heroku endpoints for our app: one for the React frontend that runs all our React code and client-facing material, and one that is just a backend API endpoint that we can hit.

We've already created a backend Heroku endpoint for you:
https://mern-comment-box-api.herokuapp.com

You can see the comments at:
https://mern-comment-box-api.herokuapp.com/comments

..and you may reset the backend by hitting:
 https://mern-comment-box-api.herokuapp.com/reset

 The repo for this backend is here:
 https://github.com/SF-WDI-LABS/comment-box-api

 Let's change our React app to hit this endpoint.



Now, when we render our comment box, we can also use this:

```js
ReactDOM.render(
  <CommentBox
    url='https://mern-comment-box-api.herokuapp.com/comments' pollInterval={2000} />,
  document.getElementById('root')
);
```

Finally, in the CommentBox component, make sure we appropriately access the right json data:

```js
...
loadCommentsFromServer(){
  axios.get(this.props.url)
    .then(res => {
      this.setState({ data: res.data.comments });
    })
}
...
```

Now, you can run `npm start` to hit a real live backend!
