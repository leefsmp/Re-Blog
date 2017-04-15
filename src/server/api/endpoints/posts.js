import ServiceManager from '../services/SvcManager'
import express from 'express'
import Debug from 'debug'

module.exports = function() {

  var router = express.Router()

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/', async (req, res)=> {

    try {

      const postsSvc = ServiceManager.getService('PostsSvc')

      var opts = {
        fieldQuery:{
          $or: [
            { private: false },
            { private: null }
          ]
        },
        pageQuery: {
          title: 1
        }
      }

      if(req.query.skip)
        opts.pageQuery.skip = req.query.skip

      if(req.query.limit)
        opts.pageQuery.limit = req.query.limit

      const response = await postsSvc.getPosts(opts)

      res.json(response)

    } catch (error) {

      res.status(error.statusCode || 404)
      res.json(error)
    }
  })

  return router
}
