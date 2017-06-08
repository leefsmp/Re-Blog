// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import PostsRoute from './Posts'
import AboutRoute from './About'
import HomeRoute from './Home'

export const createRoutes = (store) => ({
  indexRoute  : HomeRoute(store),
  component   : CoreLayout,
  path        : '/',
  childRoutes : [
    AboutRoute(store),
    PostsRoute(store)
  ]
})

export default createRoutes


