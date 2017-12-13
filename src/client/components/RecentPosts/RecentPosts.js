import Masonry from 'react-masonry-component'
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
  renderList () {

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

    return (
      <div className="list">
        {postItems}
      </div>
    )
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderMasonry () {

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

    return (
      <Masonry>
      {postItems}
      </Masonry>
    )
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    const posts = (this.props.style === 'masonry')
      ? this.renderMasonry()
      : this.renderList()

    return (
      <div className="recent-posts">
        <div className="title">
          <span className="fa fa-bars"/>
          Recent Posts
        </div>
        {posts}
      </div>
    )
  }
}

export default RecentPosts
