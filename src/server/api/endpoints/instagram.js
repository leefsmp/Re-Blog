
import ServiceManager from '../services/SvcManager'
import { OAuth2 } from 'oauth'
import express from 'express'
import config from 'c0nfig'

module.exports = function() {

  var router = express.Router()

  var oauth2 = new OAuth2(
    config.instagram.oauth.clientId,
    config.instagram.oauth.clientSecret,
    config.instagram.oauth.baseUri,
    config.instagram.oauth.authenticationUri,
    config.instagram.oauth.accessTokenUri,
    null)

  /////////////////////////////////////////////////////////////////////////////
  // login endpoint
  //
  /////////////////////////////////////////////////////////////////////////////
  router.post('/login', function (req, res) {

    var authURL = oauth2.getAuthorizeUrl({
      redirect_uri: config.instagram.oauth.redirectUri,
      scope: config.instagram.oauth.scope
    })

    res.json(authURL + '&response_type=code')
  })

  /////////////////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////////////////
  router.get('/auth/callback', function (req, res) {

    if(!req.query || !req.query.code) {

      res.json('invalid request')
      return
    }

    oauth2.getOAuthAccessToken(
      req.query.code, {
        'grant_type': 'authorization_code',
        'redirect_uri': config.instagram.oauth.redirectUri
      },
      function (err, access_token, refresh_token, results) {

        try {

          res.json({
            access_token
          })
        }
        catch(ex){

          res.status(500)
          res.end(ex)
        }
      }
    )
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
  //
  //
  /////////////////////////////////////////////////////////////////////////////
  router.get('/tag', async (req, res) => {

    const instagramSvc = ServiceManager.getService('InstagramSvc')

    var response = await instagramSvc.getTag()

    res.json(response)
  })

  /////////////////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////////////////
  router.get('/recent', async (req, res) => {

    try {

      const instagramSvc = ServiceManager.getService(
        'InstagramSvc')

      const response = await instagramSvc.getUserRecentMedia(
        '5575952778')

      res.json(response)

    } catch (ex) {

      res.json(ex)
    }
  })

  return router
}

//https://www.instagram.com/oauth/authorize/?client_id=c2ba92ef11c44dc98263fba525e26707&redirect_uri=http://localhost&response_type=token&scope=public_content
