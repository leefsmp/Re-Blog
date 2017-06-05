
import ServiceManager from '../services/SvcManager'
import express from 'express'
import config from 'c0nfig'
import fs from 'fs'

module.exports = function() {

  const router = express.Router()

  //////////////////////////////////////////////////////////////
  // GET /buckets/:bucketKey/objects/:objectKey
  //
  //
  //////////////////////////////////////////////////////////////
  router.get('/img/:imgId',
    async (req, res) => {

    try {

      const forgeSvc = ServiceManager.getService('ForgeSvc')

      const ossSvc = ServiceManager.getService('OssSvc')

      const token = await forgeSvc.get2LeggedToken()

      const bucketKey = config.img.bucketKey

      const objectKey = req.params.imgId

      const object =
        await ossSvc.getObject(
          token, bucketKey, objectKey)

      res.end(object)

    } catch(ex) {

      res.status(error.statusCode || 500)
      res.json(error)
    }
  })

  return router
}
