import InstagramEmbed from 'react-instagram-embed'
import { IndexLink, Link } from 'react-router'
import React from 'react'
import './HomeView.scss'

class HomeView extends React.Component {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor() {

    super()

    this.onImgLoaded = this.onImgLoaded.bind(this)

    this.state = {

    }
  }

  sleep (ms) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms)
    })
  }

  async onImgLoaded () {

    while($('.instagram-media').length === 0) {

      await this.sleep(100)
    }

    const head = $('.instagram-media').contents().find("head")

    const css = `
      <style type="text/css">
        .EmbedHeader {
          display: none !important;
        }

        .EmbedFrame {
          position: relative;
          padding-bottom: 100% !important;
        }
      </style>`

    const iFrame = $('#instagram-embed-0')[0]

    $('#instagram-embed-0').on('load', ()=>{

      $(head).append(css)
    })

    while(true) {

      await this.sleep(100)

      $(head).append(css)
    }
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  render() {

    //<img className='logo-hero'/>

    return (
      <div className="home">

      </div>
    )
  }
}

export default HomeView
























































