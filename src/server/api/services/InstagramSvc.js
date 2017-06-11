
import Instagram from 'instagram-node'
import BaseSvc from './BaseSvc'

export default class InstagramSvc extends BaseSvc {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor (config) {

    super (config)

    this.instagram = Instagram.instagram()

    this.instagram.use({
      access_token: '5575952778.c2ba92e.e24eef63e15f4e60b22dcfb618a41009'
      //client_secret: config.oauth.clientSecret,
      //client_id: config.oauth.clientId
    })
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
  getUserRecentMedia (userId) {

    return new Promise((resolve, reject) => {

      this.instagram.user_media_recent(userId,
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

