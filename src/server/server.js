/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2016 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////
import {serverConfig as config} from 'c0nfig'

//Server stuff
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import httpProxy from 'http-proxy'
import express from 'express'
import path from 'path'

//Authentication stuff
import session from 'express-session'
import store from 'connect-mongo'
import passport from 'passport'

//Webpack hot reloading stuff
import webpackConfig from '../../webpack/webpack.config.development'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'

//Endpoints
import AuthenticateAPI from './api/endpoints/authenticate'
import DerivativeAPI from './api/endpoints/derivatives'
//import InstagramAPI from './api/endpoints/instagram'
import TokenAPI from './api/endpoints/token'
import UserAPI from './api/endpoints/user'
import AppAPI from './api/endpoints/app'
import DMAPI from './api/endpoints/dm'

//Services
import DerivativeSvc from './api/services/DerivativeSvc'
import InstagramSvc from './api/services/InstagramSvc'
import SocketSvc from './api/services/SocketSvc'
import ForgeSvc from './api/services/ForgeSvc'
import TokenSvc from './api/services/TokenSvc'
import DMSvc from './api/services/DMSvc'

/////////////////////////////////////////////////////////////////////
// Webpack hot-reloading setup
//
/////////////////////////////////////////////////////////////////////
function setWebpackHotReloading(app) {

    var compiler = webpack(webpackConfig)

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }))

    app.use(webpackHotMiddleware(compiler))
}

/////////////////////////////////////////////////////////////////////
// Routes setup
//
/////////////////////////////////////////////////////////////////////
function initializeRoutes (app, server) {

    return new Promise(async(resolve, reject) => {

        try {

            var socketSvc = new SocketSvc({
                config: {
                    server,
                    session
                }
            })

            var instagramSvc = new InstagramSvc({
                config: config.instagram
            })

            var tokenSvcSvc = new TokenSvc({
                config: config.dotty
            })

            var forgeSvc = new ForgeSvc({
                config: config.forge
            })

            var dmSvc = new DMSvc({
                config: config.forge
            })

            var derivativeSvc = new DerivativeSvc({
                config: config.forge
            })

            var MongoStore = store(session)

            app.use(session({
                secret: 'margarita',
                saveUninitialized: false,
                resave: false,
                httpOnly: true,
                //secure: true, //requires HTTPS
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 // 24h
                },
                store: new session.MemoryStore

                //store: new MongoStore({
                //    url: dbSvc.getConnectionURL(),
                //    autoRemove: 'native', // Default
                //    autoRemoveInterval: 10 // In minutes. Default
                //})
            }))

            app.use(passport.initialize())
            app.use(passport.session())

            /////////////////////////////////////////////////////////
            //  API Endpoints Public
            /////////////////////////////////////////////////////////

            app.use(`/api/authenticate`,
              AuthenticateAPI())

            /////////////////////////////////////////////////////////
            //  API Endpoints Private
            /////////////////////////////////////////////////////////

            function authenticateAPI(req, res, next) {

                if(!req.user) {
                    res.status(401)
                    return res.send('Unauthorized!')
                }

                next()
            }

            app.use('/api/instagram',
              authenticateAPI,
              InstagramAPI())

            // Dotty Server APIs with
            // Token Authentication

            const proxy = httpProxy.createProxyServer({
                target: config.dotty.baseUri,
                ws: true
            })

            proxy.on('error', (err)=> {
                console.log(err)
            })

            app.use('/api/', authenticateAPI, (req, res) => {

                req.headers['x-access-token'] =
                  req.user.tokenInfo.token

                proxy.web(req, res, {
                    target: config.dotty.baseUri
                })
            })

            app.use('/resources',
              express.static(__dirname + '/../../resources'))

            var faviconPath = path.resolve(
              __dirname + '/../../resources/img/favicon.png')

            app.use(favicon(faviconPath))

            app.use(bodyParser.urlencoded({
                limit: '100mb',
                extended: false
            }))

            app.use(bodyParser.json({ limit: '100mb' }))

            app.use(cookieParser())

            app.use(`/authenticate`,
              AuthenticateAPI())

            //Public Web Pages
            app.use('/login',
              express.static(path.resolve(
                __dirname, '../../login')))

            function authenticatePage(req, res, next) {

                if(!req.user) {
                    res.redirect('/login')
                    return
                }

                next()
            }

            app.use(
              authenticatePage,
              express.static(path.resolve(
                __dirname, '../../dist')))

            //app.get('*',
            //  authenticatePage,
            //  (req, res)=> {
            //      res.sendFile(path.resolve(
            //        __dirname, '../../dist/index.html'))
            //  })

            //app.use(handleRender)

            resolve()
        }
        catch (ex) {

            console.log(ex)
            reject(ex)
        }
    })
}

/////////////////////////////////////////////////////////////////////
// server setup
//
/////////////////////////////////////////////////////////////////////
var app = express()

app.set('port', process.env.PORT || config.port || 3000)

var server = app.listen(app.get('port'), async () => {

    await initializeRoutes (app, server)

    console.log('Server listening on: ')
    console.log(server.address())
})