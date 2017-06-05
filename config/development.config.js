
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
  },

  instagram: {
    oauth: {
      hardcodedToken: '',
      clientId: process.env.INSTA_CLIENT_ID,
      clientSecret: process.env.INSTA_CLIENT_SECRET,
      baseUri: '',
      authenticationUri: '',
      accessTokenUri: ''
    }
  }
}

module.exports = config


