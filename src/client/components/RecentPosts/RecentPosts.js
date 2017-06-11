import ServiceManager from 'SvcManager'
import { Link } from 'react-router'
import './RecentPosts.scss'
import React from 'react'

class RecentPosts extends React.Component {

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
  componentDidMount () {

    this.postsSvc.getPosts().then((posts) => {
      this.setState({
        posts
      })
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderPosts () {

    const postItems = this.state.posts.map((post) => {

      const href = `/posts?id=${post._id}`

      return (
        <div key={post._id} className="recent-post-item">
          <Link to={href}>
            <div className="content">
              <img src="/resources/img/test.png"/>
              <div className="title">
                {post.title}
              </div>
              <div className="date">
                {post.date}
              </div>
            </div>
          </Link>
          <hr/>
        </div>
      )
    })

    return postItems
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    return (
      <div className="recent-posts">
        <div className="title">
          <span className="fa fa-bars"/>
          Recent Posts
        </div>
        <div className="list">
          {this.renderPosts()}
        </div>
      </div>
    )
  }
}

export default RecentPosts
