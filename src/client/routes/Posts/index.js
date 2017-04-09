import { injectReducer } from '../../store/reducers'

export default (store) => ({

  path : 'posts',

  getComponent (nextState, cb) {

    require.ensure([], (require) => {

      const container = require('./containers/PostsContainer').default
      const reducer = require('./modules/posts').default

      injectReducer(store, { key: 'posts', reducer })

      cb(null, container)

    }, 'posts')
  }
})
