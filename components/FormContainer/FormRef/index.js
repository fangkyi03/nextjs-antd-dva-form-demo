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

  renderAnimate = (error) =>{
    return (
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
    )
  }

  renderChildren = (stateProps) =>{
    return (
      <span className={'ant-form-item-children'}>
        {
          React.cloneElement(this.props.children, {
            onChange: this.props.onChange,
            ...stateProps
          })
        }
      </span>
    )
  }

  render() {
    const {stateProps} = this.state
    const { error } = stateProps
    const classes = classNames(
      'ant-form-item-children', {
        'has-error': error,
      }
    )
    return (
      <div className={classes} key="help">  
        {/* 渲染子组件 */}
        {this.renderChildren(stateProps)}
        {/* 渲染动画错误 */}
        {error && this.renderAnimate(error)}
      </div>
    )
  }
}
