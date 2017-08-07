import React, {Component} from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

import style from './style';

class CommentBox extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  render() {

    return (

      <div style={ style.commentBox }>

        <CommentList
          data={ this.state.data } />
        <CommentForm />

      </div>
    )
  }
}

export default CommentBox
