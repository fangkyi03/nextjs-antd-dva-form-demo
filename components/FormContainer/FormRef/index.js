import React, { Component } from 'react'
import Animate from 'rc-animate';
import classNames from 'classnames';
export default class FormRef extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stateProps:{}
    }
  }
  
  setProps = (propsData) =>{
    this.setState({
      stateProps:propsData
    })
  }

  render() {
    const {stateProps} = this.state
    console.log('输出stateProps', stateProps)
    const { error } = stateProps
    const classes = classNames(
      'ant-form-item-children', {
        'has-error': error,
      }
    )
    return (
      <div className={classes} key="help">
        <span className={'ant-form-item-children'}>
          {
            React.cloneElement(this.props.children, {
              onChange: this.props.onChange,
              ...stateProps
            })
          }
        </span>
        {
          error &&
          <Animate
            transitionName="show-help"
            component=""
            transitionAppear
            key="help"
          >
            <div className={`ant-form-explain`} key="help">
              {error}
            </div>
          </Animate>
        }
      </div>
    )
  }
}
