import React, { Component } from 'react'
import {Card} from 'antd'
import FormView from '../FormView';

export default class FormCard extends Component {
  render() {
    const {data = [],formEvent,...arg} = this.props
    return data.map((e,i)=>{
        return (
            <Card key={i} title={e.title}>
                <FormView
                    data={e.data}
                    formEvent={formEvent}
                    {...arg}
                />
            </Card>
        )
    })
  }
}
