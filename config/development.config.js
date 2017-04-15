
/////////////////////////////////////////////////////////////////////
// DEVELOPMENT configuration
//
/////////////////////////////////////////////////////////////////////
const config = {

  client: {
    host: 'http://localhost',
    env: 'development',
    port: 3000
  },

  database: {
    dbName: 're-blog',
    user: '',
    pass: '',
    dbhost: 'localhost',
    port: 27017,
    collections: {
      posts: 'posts'
    }
  }
}

module.exports = config


