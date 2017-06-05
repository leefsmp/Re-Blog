import InstagramEmbed from 'react-instagram-embed'
import ServiceManager from 'SvcManager'
import { Link } from 'react-router'
import './PostsView.scss'
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
      post: null,
      posts: []
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  setReactState (state) {

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

    this.update (this.props)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentWillReceiveProps (props) {

    this.update (props)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  update (props) {

    const { id } = props.location.query

    if (id) {

      this.postsSvc.getPost(id).then((post) => {
        this.setReactState({
          post
        })
      })

    } else {

      this.postsSvc.getPosts().then((posts) => {
        this.setReactState({
          post: null,
          posts
        })
      })
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderPost (post) {

    return (
      <div key={post._id} className="post-item">
        <Link  to={`/posts?id=${post._id}`}>
          <div className="image-container">
            <img src="/resources/img/test.png"/>
          </div>
          <h2 className="title">
              {post.title}
          </h2>
          <div className="content">
              {post.content}
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
  renderPosts (posts) {

    const postList = posts.map((post) => {

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

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderPostDetails (post) {

    return (
      <div className="posts-view">
        <div className="post-item-details">
          <div className="title">
            {post.title}
          </div>
          <div className="content">
            {post.content}
          </div>
        </div>
      </div>
    )
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    return this.state.post
      ? this.renderPostDetails(this.state.post)
      : this.renderPosts(this.state.posts)

  }
}

export default PostsView


