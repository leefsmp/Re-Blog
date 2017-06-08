import React from 'react'
import './InfoBar.scss'

class InfoBar extends React.Component {

  render () {

    const {country, date} = this.props
    return (
      <div className="info-bar">
        <span className="fa fa-map-pin" aria-hidden="true"/>
        {country.name}
        <span className="fa fa-clock-o" aria-hidden="true"/>
         {date}
      </div>
    )
  }
}

export default InfoBar
