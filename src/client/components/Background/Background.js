import Trianglify from './react-trianglify.js'
import Measure from 'react-measure'
import './Background.scss'
import React from 'react'

class Background extends React.Component {

  constructor (props) {

    super(props)

    this.animate = this.animate.bind(this)

    this.state = {
      variance: 0.8,
      dimensions: {
        height: 0,
        width: 0
      }
    }

    this.varianceDeg = 0
  }

  assignState (state) {

    return new Promise((resolve) => {

      const newState = Object.assign({},
        this.state, state)

      this.setState(newState, () => resolve())
    })
  }

  animate () {

    this.varianceDeg += 1 * Math.PI / 180

    const variance =
      0.5 + 0.45 * Math.sin(this.varianceDeg)

    this.assignState({variance}).then(() => {

      requestAnimationFrame(this.animate)
    })
  }

  componentDidMount() {

    //this.animate()
  }

  render () {

    const {variance, dimensions} = this.state

    return (
      <Measure
        bounds
        onResize={(rect) => {
          this.assignState({ dimensions: rect.bounds })
        }}>
        {
          ({ measureRef }) => {

            return (
              <div ref={measureRef} className="background">
                {
                  (dimensions.with !==0 && dimensions.height !==0) &&
                  <Trianglify output="svg"
                    cell_size={60}
                    x_colors='Blues'
                    y_colors='match_x'
                    variance={variance}
                    height={dimensions.height}
                    width={dimensions.width}
                  />
                }
              </div>
            )
          }
        }
      </Measure>
    )
  }
}

export default Background