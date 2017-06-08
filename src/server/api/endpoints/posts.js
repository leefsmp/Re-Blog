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
          country: 1,
          teaser: 1,
          title: 1,
          date: 1
        }
      }

      if(req.query.skip)
        opts.pageQuery.skip = req.query.skip

      if(req.query.limit)
        opts.pageQuery.limit = req.query.limit

      const response = await postsSvc.getPosts(opts)

      res.json(response)

    } catch (error) {

      res.status(error.statusCode || 500)
      res.json(error)
    }
  })

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/:id', async (req, res)=> {

    try {

      const postsSvc = ServiceManager.getService('PostsSvc')

      const pageQuery = {}

      const response = await postsSvc.getById(
        req.params.id, {
          pageQuery
        })

      res.json(response)

    } catch (error) {

      res.status(error.statusCode || 500)
      res.json(error)
    }
  })

  return router
}
