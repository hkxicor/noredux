import React, { Component, PropTypes } from 'react'

export default class AppState extends Component {
  constructor(props){
    super(props)
    this.state = this.props.initialState
    this.changeState = this.changeState.bind(this)
  }
  changeState(newState, callback){
    this.setState(newState, () => {
      if(this.props.debug){
        console.log('App State Mutate: ',JSON.stringify(this.state));
      }
      if(callback){
        callback()
      }
    })
  }
  render(){
    const { children } = this.props
    return (
      <div className="AppState">
        {
          React.Children.map(children, child => {
            return React.cloneElement(child, {
              appState: this.state,
              changeState: this.changeState
            })
          })
        }
      </div>
    )
  }
}

AppState.PropTypes = {
  initialState: React.PropTypes.object
}
