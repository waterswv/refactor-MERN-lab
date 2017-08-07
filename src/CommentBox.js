//CommentBox.js
import React, { Component } from 'react';
import $ from 'jquery-ajax';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import style from './style';

class CommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = { data: []  };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  loadCommentsFromServer() {
    $.ajax({
      method: 'GET',
      url: this.props.url
    })
    .then((res) => {
      this.setState({ data: res });
    }, (err) => {
      console.log('error', err)
    })
  }
  handleCommentSubmit(comment) {
    //add POST request
  }
  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div style={ style.commentBox }>
          <h2>Comments:</h2>
        <CommentList data={ this.state.data }/>
        <CommentForm onCommentSubmit={ this.handleCommentSubmit }/>

      </div>
    )
  }
}

export default CommentBox
