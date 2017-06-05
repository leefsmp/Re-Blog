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
      posts: []
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

    this.postsSvc.getPosts().then((posts) => {
      this.assignState({
        posts
      })
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderPost (post) {

    const href = `/posts?id=${post._id}`

    return (
      <div key={post._id} className="post-item">
        <Link to={href}>
          <div className="image-container">
            <img src="/resources/img/test.png"/>
          </div>
          <h2 className="title">
              {post.title}
          </h2>
          <div className="content">
              {post.teaser}
          </div>
          <div className="footer">

          </div>
        </Link>
      </div>
    )
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    const postList = this.state.posts.map((post) => {

      return this.renderPost(post)
    })

    return (
      <div className="posts-view">
        <div className="container">
          <div className="primary">
            <div className="post-items">
            {postList}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PostsView


