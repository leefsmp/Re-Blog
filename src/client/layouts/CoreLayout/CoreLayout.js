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
      <div className='core-layout'>
        <Background/>
        <div className="content">
          <Header {...this.props}/>
          {children}
        </div>
      </div>
    )
  }
}

export default CoreLayout

//https://colorlib.com/travelify/