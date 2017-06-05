
import Instagram from 'instagram-node'
import BaseSvc from './BaseSvc'

export default class InstagramSvc extends BaseSvc {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor (opts) {

    super (opts)

    this.instagram = Instagram.instagram()

    //this.instagram.use({
    //  access_token: this._config.oauth.hardcodedToken
    //})
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  name () {

    return 'InstagramSvc'
  }

  /////////////////////////////////////////////////////////////////
  // if(pagination.next) {
  //  pagination.next(method)
  //}
  //
  /////////////////////////////////////////////////////////////////
  getRecentTagMedia () {

    return new Promise((resolve, reject) => {

      this.instagram.tag_media_recent('tag',
        (err, medias, pagination, remaining, limit) => {

          return err
            ? reject(err)
            : resolve({
                medias,
                pagination,
                remaining,
                limit
              })
        })
    })
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getMedia (mediaId) {

    return new Promise((resolve, reject) => {

      this.instagram.media(mediaId,
        (err, media, remaining, limit) => {

          return err
            ? reject(err)
            : resolve({
                media, remaining, limit
              })
        })
    })
  }
}

