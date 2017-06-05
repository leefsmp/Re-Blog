import Background from './background'
import 'Dialogs/dialogs.scss'
import Header from 'Header'
import React from 'react'
import 'core.scss'

class CoreLayout extends React.Component {

  static propTypes = {
    children : React.PropTypes.element.isRequired
  }

  render () {

    const { children } = this.props

    return (
      <div className='container text-center'>
        <Header {...this.props}/>
        <div className='core-layout'>
          <Background/>
          {children}
        </div>
      </div>
    )
  }
}

export default CoreLayout

//https://colorlib.com/travelify/