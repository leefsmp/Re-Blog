
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
    user: process.env.REBLOG_USER,
    pass: process.env.REBLOG_PASS,
    collections: {
      posts: 'posts'
    }
  },

  instagram: {
    oauth: {
      hardcodedToken: ''
    }
  }
}

module.exports = config

