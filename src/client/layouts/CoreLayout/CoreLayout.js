import Background from 'Background'
import 'Dialogs/dialogs.scss'
import Header from 'Header'
import Footer from 'Footer'
import React from 'react'
import 'core.scss'

class CoreLayout extends React.Component {

  render () {

    const { children } = this.props

    return (
      <div className='core-layout'>
        <Background/>
        <div className="content">
          <Header {...this.props}/>
          {children}
          <Footer/>
        </div>
      </div>
    )
  }
}

export default CoreLayout