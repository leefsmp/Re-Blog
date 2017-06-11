import React from 'react'
import './ImageGrid.scss'

class ImageGrid extends React.Component {

  render () {

    const items = this.props.images.map((img) => {

      return (
        <a href={img.link} target="_blank">
          <figure>
            <img src={img.src}/>
          </figure>
        </a>
      )
    })

    return (
      <div className={"image-grid " + this.props.size}>
        {items}
      </div>
    )
  }
}

export default ImageGrid
