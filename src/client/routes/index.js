// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import PostsRoute from './Posts'
import HomeRoute from './Home'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : HomeRoute(store),
  childRoutes : [
    PostsRoute(store)
  ]
})

export default createRoutes
