### Sprint 1: Components Setup

Let's go ahead and create some components!



### Build a basic comment box:

<details>
  <summary>Build a React container component called <code>CommentBox</code> that renders a <code>CommentList</code> and a <code>CommentForm</code>. Your component should have a <code>state</code> attribute called <code>data</code> (which should just be an empty array). You should pass daata into the <code>CommentList</code> as a <code>prop</code> called <code>data</code> </summary>
  



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

</details>


### Next, let's make a list of comments:

<details>
  <summary> This React component should be capable of rendering mulitple <code>Comment</code> components. To make this list of components use <a href="http://jasonjl.me/blog/2015/04/18/rendering-list-of-elements-in-react-with-jsx/">JavaScript's map function like in this article.</a> The style of the code in the sample below is slightly different than in the article. Both are acceptable syntax. </summary>
  

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

</details>



### Build a basic Comment component:

<details>
  <summary> This should be able to take in the basic information about a comment (author and text) in props and render them on the page.
  
  </summary>
  
  
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

</details>



### Now we need a form for POSTing:

<details>
  <summary> This component, <code>CommentForm</code> should be a form capable of handling changes in the form fields so that the state of the component changes. The state should start as <code>this.state = { author: '', text: '' }</code>
    
  </summary>

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

</details>

Take a moment to review these components. When is `state` used? when is `props` used? Which components are most associated with which CRUD actions?

Now take a peek at `data.js`. We've provided a few entries for you. Feel free to add some more entries to seed your project.

Go ahead and run `nodemon`. You should see an error! That's ok.
