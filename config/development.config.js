
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

  img: {
    bucketKey: 'hd-img'
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
  },

  forge: {

    oauth: {
      clientSecret: process.env.FORGE_CLIENT_SECRET,
      clientId: process.env.FORGE_CLIENT_ID,

      scope: [
        'data:read',
        'data:write',
        'data:create',
        'bucket:read',
        'bucket:create',
        'bucket:delete'
      ]
    }
  }
}

module.exports = config


