import { injectReducer } from '../../store/reducers'

export default (store) => ({

  path : '/about',

  getComponent (nextState, cb) {

    require.ensure([], (require) => {

      const container = require('./containers/AboutContainer').default

      const reducer = require('./modules/about').default

      injectReducer(store, { key: 'about', reducer })

      cb(null, container)

    }, 'about')
  }
})


