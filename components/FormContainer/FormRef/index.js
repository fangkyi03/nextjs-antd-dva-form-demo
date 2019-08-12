import React, { Component } from 'react'
import Animate from 'rc-animate';
import classNames from 'classnames';
import apiTool from '../../../command/apiTool';
export default class FormRef extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stateProps:props || {}
    }
  }
  
  setProps = (propsData) =>{
    this.setState({
      stateProps:{...this.state.stateProps,...propsData}
    })
  }

  setNotDisplay = (isShow) =>{
    this.setState({
      stateProps:{
        ...this.state.stateProps,
        notDisplay:!isShow
      }
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
    const { error, notDisplay } = stateProps
    if (notDisplay) return null
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
        {error ? this.renderAnimate(error) : <div style={{ minHeight: 29.33, maxHeight:29.33,width:'100%',marginTop:apiTool.getSize(5)}}></div>}
      </div>
    )
  }
}
