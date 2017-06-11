import ServiceManager from 'SvcManager'
import Measure from 'react-measure'
import ImageGrid from 'ImageGrid'
import './RecentMedias.scss'
import React from 'react'

class RecentMedias extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor () {

    super ()

    this.onClickThumbnail = this.onClickThumbnail.bind(this)

    this.postsSvc = ServiceManager.getService(
      'InstaSvc')

    this.state = {
      images: [],
      dimensions: {
        height: 0,
        width: 0
      }
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentDidMount () {

    this.postsSvc.getRecentMedias({count: 18}).then((res) => {

      const medias = res.medias || []

      const images = medias.map((entry) => {

        return {
          thumbnail: entry.images.thumbnail.url,
          src: entry.images.thumbnail.url,
          thumbnailHeight: 150,
          thumbnailWidth: 150,
          link: entry.link
        }
      })

      this.assignState({
        images
      })
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  assignState (state) {

    return new Promise((resolve) => {

      const newState = Object.assign(
        {}, this.state, state)

      this.setState(newState, () => {
        resolve()
      })
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onClickThumbnail (idx) {

    window.open(this.state.images[idx].link, '_blank')
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderContent () {

    return (
      <ImageGrid
        images={this.state.images}
        size={this.props.size}
      />
    )
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    const { width, height } = this.state.dimensions

    return (
      <Measure
        bounds
        onResize={(rect) => {
          this.assignState({ dimensions: rect.bounds })
        }}>
        {
          ({ measureRef }) =>
            <div ref={measureRef} className="recent-medias">
              <div className="title">
                <span className="fa fa-instagram"/>
                Recent Pictures
              </div>
              <div className="content">
                {this.renderContent()}
              </div>
            </div>
        }
      </Measure>
    )
  }
}

export default RecentMedias
