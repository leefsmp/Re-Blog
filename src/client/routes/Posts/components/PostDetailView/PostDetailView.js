import InstagramEmbed from 'react-instagram-embed'
import { browserHistory } from 'react-router'
import ServiceManager from 'SvcManager'
import { Link } from 'react-router'
import React from 'react'

class PostsView extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor () {

    super ()

    this.postsSvc = ServiceManager.getService(
      'PostsSvc')

    this.state = {
      post: null
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  assignState (state) {

    return new Promise((resolve) => {

      const newState = Object.assign(
        {}, this.state, state)

      this.setState(newState, () => {
        resolve()
      })
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentDidMount () {

    this.postsSvc.getPost(this.props.postId).then((post) => {

      this.assignState({
        post
      })
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderPostDetails (post) {

    return (
      <div key={post._id} className="post-item detail">
        <div className="image-container">
          <img src="/resources/img/test.png"/>
        </div>
        <h2 className="title">
            {post.title}
        </h2>
        <div dangerouslySetInnerHTML={{__html: post.content}}
          className="content"/>
        <div className="footer">

        </div>
      </div>
    )
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    if (!this.state.post) {
      return false
    }

    return (
      <div className="posts-view">
        <div className="container">
          <div className="primary">
            <div className="post-items">
              {this.renderPostDetails(this.state.post)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PostsView


