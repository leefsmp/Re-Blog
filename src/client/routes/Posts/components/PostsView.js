import InstagramEmbed from 'react-instagram-embed'
import ServiceManager from 'SvcManager'
import './PostsView.scss'
import React from 'react'

class PostsView extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static propTypes = {
    dbItems: React.PropTypes.array
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static defaultProps = {
    dbItems: []
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor () {

    super ()

    this.postsSvc = ServiceManager.getService(
      'PostsSvc')
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentWillMount () {

    const { id } = this.props.location.query

    if (id) {

    } else {

      this.postsSvc.getPosts().then((posts) => {

        console.log(posts)
        this.props.loadDbItems(posts)
      })
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderPosts (posts) {

    return posts.map((post) => {

      return (
        <div key={post._id} className="post-item">
          {post.title}
        </div>
      )
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    return (
      <div className="posts-view">
        {this.renderPosts(this.props.dbItems)}
      </div>
    )
  }
}

export default PostsView


