import ServiceManager from './SvcManager'
import BaseSvc from './BaseSvc'
import mongo from 'mongodb'

export default class PostsSvc extends BaseSvc {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor (config) {

    super (config)
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  name() {

    return 'PostsSvc'
  }

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  getById (modelId, opts = {}) {

    var _thisSvc = this

    return new Promise(async(resolve, reject) => {

      try {

        var dbSvc = ServiceManager.getService(
          this._config.dbName)

        const query = Object.assign({}, opts, {
          fieldQuery: {
            _id: new mongo.ObjectId(modelId)
          }
        })

        var model = await dbSvc.findOne(
          _thisSvc._config.collections.models,
         query)

        return resolve(model)

      } catch(ex){

        return reject(ex)
      }
    })
  }

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  getPosts (opts = {}) {

    var _thisSvc = this

    return new Promise(async(resolve, reject) => {

      try {

        const dbSvc = ServiceManager.getService(
          this._config.dbName)

        const posts = await dbSvc.getItems(
          _thisSvc._config.collections.posts,
          opts)

        return resolve(posts)

      } catch(ex) {

        console.log(ex)
        return reject(ex)
      }
    })
  }
}
