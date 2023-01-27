import React from 'react'
import { connect } from 'react-redux'
function Message(props) {
  const {newMessage} = props
  return (
  <div id="message">{newMessage}</div>
  )  
}
  const mapStateToProps = (state) => {
  return({
    newMessage: state.infoMessage
  })
}
export default connect(mapStateToProps)(Message)