
/////////////////////////////////////////////////////////////////////
// PRODUCTION configuration
//
/////////////////////////////////////////////////////////////////////
const config = {

  client: {
    host: 'http://localhost',
    env: 'production',
    port: 443
  },

  database: {
    dbName: process.env.REBLOG_DBNAME,
    dbhost: process.env.REBLOG_DBHOST,
    port: process.env.REBLOG_DBPORT,
    user: process.env.REBLOG_DBUSER,
    pass: process.env.REBLOG_DBPASS,
    collections: {
      posts: 'posts'
    }
  },

  instagram: {
    oauth: {
      hardcodedToken: ''
    }
  },

  img: {
    bucketKey: 'hd-img'
  },

  forge: {

    oauth: {
      clientSecret: process.env.FORGE_CLIENT_SECRET,
      clientId: process.env.FORGE_CLIENT_ID,

      scope: [
        'data:read'
      ]
    }
  }
}

module.exports = config

