import React from 'react'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'
import {connect} from 'react-redux'
const cogs = [0, 1, 2, 3, 4, 5]
function Wheel(props) {
  const {spot, moveClockwise, moveCounterClockwise} = props
  return (
    <div id="wrapper">
      <div id="wheel">
        {cogs.map((cog) => {
          return(
          <div className={`${spot === cog ? "active" : null} cog`} key={cog} style={{"--i": cog}}>{spot === cog && "B"}</div>
          )
        })}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => moveCounterClockwise()}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() => moveClockwise()}>Clockwise</button>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    spot: state.wheel
  }
}
export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel)