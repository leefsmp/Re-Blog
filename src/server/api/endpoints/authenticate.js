
var LocalStrategy = require('passport-local').Strategy
import ServiceManager from '../services/SvcManager'
var passport = require('passport')
var express = require('express')

module.exports = function() {

  var router = express.Router()

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  passport.use('user', new LocalStrategy({
      usernameField: 'login',
      passwordField: 'password'
    }, async(login, password, done)=> {

    try {

      var user = {
        name: 'TODO',
        login,
        password
      }

      var tokenSvc = ServiceManager.getService(
        'TokenSvc')

      user.tokenInfo = await tokenSvc.requestToken(user)

      return done(null, user)
    }
    catch(ex){

      return done(null, false, {
        message: 'Incorrect Credentials'
      })
    }
  }))

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  router.post('/login',
    passport.authenticate('user'), async(req, res)=> {

    if (req.user) {

      res.json('success')
    }
    else {

      res.status(401)
      res.json('Unauthorized')
    }
  })

  router.post('/logout', (req, res)=> {

    req.logout()
    res.send('logged out')
  })

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  passport.serializeUser((user, done)=> {

    done(null, user)
  })

  passport.deserializeUser((user, done)=> {

    done(null, user)
  })

  return router
}