
import ServiceManager from '../services/SvcManager'
import { serverConfig as config } from 'c0nfig'
import { OAuth2 } from 'oauth'
import express from 'express'

module.exports = function() {

  var router = express.Router()

  var oauth2 = new OAuth2(
    config.credentials.ConsumerKey,
    config.credentials.ConsumerSecret,
    config.baseUrl,
    config.authenticationUrl,
    config.accessTokenUrl,
    null)

  /////////////////////////////////////////////////////////////////////////////
  // Register socketId from client
  //
  /////////////////////////////////////////////////////////////////////////////
  router.post('/register', function (req, res) {

    req.session.socketId = req.body.socketId

    res.json('success')
  })

  /////////////////////////////////////////////////////////////////////////////
  // login endpoint
  //
  /////////////////////////////////////////////////////////////////////////////
  router.post('/login', function (req, res) {

    var authURL = oauth2.getAuthorizeUrl({
      redirect_uri: config.redirectUrl,
      scope: config.scope
    })

    res.json(authURL + '&response_type=code')
  })

  /////////////////////////////////////////////////////////////////////////////
  // Reply looks as follow:
  //
  //  access_token: "fk7dd21P4FAhJWl6MptumGkXIuei",
  //  refresh_token: "TSJpg3xSXxUEAtevo3lIPEmjQUxXbcqNT9AZHRKYM3",
  //  results: {
  //    token_type: "Bearer",
  //    expires_in: 86399,
  //    access_token: "fk7dd21P4FAhJWl6MptumGkXIuei"
  //  }
  //
  /////////////////////////////////////////////////////////////////////////////
  router.get('/callback', function (req, res) {

    if(!req.query || !req.query.code) {

      res.json('invalid request')
      return
    }

    oauth2.getOAuthAccessToken(
      req.query.code, {
        'grant_type': 'authorization_code',
        'redirect_uri': config.redirectUrl
      },
      function (err, access_token, refresh_token, results) {

        try {

          var authSvc = ServiceManager.getService(
            'AuthSvc')

          authSvc.setToken(req.session, {
            expires_in: results.expires_in,
            refresh_token: refresh_token,
            access_token: access_token
          })

          var socketSvc = ServiceManager.getService(
            'SocketSvc')

          if(req.session.socketId) {

            socketSvc.broadcast(
              'callback', 'done',
              req.session.socketId)
          }

          res.end('done')
        }
        catch(ex){

          res.status(500)
          res.end(ex)
        }
      }
    )
  })

  /////////////////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////////////////
  router.get('/instagram/callback', function (req, res) {


    res.end('done')
  })

  /////////////////////////////////////////////////////////////////////////////
  // logout route
  //
  /////////////////////////////////////////////////////////////////////////////
  router.post('/logout', function (req, res) {

    req.session.destroy()
    res.json('logged out')
  })

  /////////////////////////////////////////////////////////////////////////////
  // refresh token
  //
  /////////////////////////////////////////////////////////////////////////////
  function refreshToken() {

    oauth2.getOAuthAccessToken(
      req.session.refreshToken, {
        'grant_type': 'refresh_token'
      },
      function (err, access_token, refresh_token, results) {

        req.session.token = access_token
      });
  }

  return router
}
