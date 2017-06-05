import InstagramEmbed from 'react-instagram-embed'
import PostDetailView from './PostDetailView'
import PostListView from './PostListView'
import './PostsView.scss'
import React from 'react'

class PostsView extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    const postId = this.props.location.query.id

    return (
      postId
        ? <PostDetailView postId={postId}/>
        : <PostListView/>
      )
  }
}

export default PostsView



