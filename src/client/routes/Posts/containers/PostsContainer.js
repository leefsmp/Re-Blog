import { connect } from 'react-redux'

import {
  setViewerEnv
  } from '../../../store/app'

import PostsView from '../components/PostsView'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => (
  Object.assign({}, state.posts, {
    appState: state.app
  })
)

export default connect(
  mapStateToProps,
  mapDispatchToProps, null, {
    pure: false
  })(PostsView)
