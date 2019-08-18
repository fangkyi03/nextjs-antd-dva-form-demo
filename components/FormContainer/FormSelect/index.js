import React, { Component, PureComponent } from 'react'
import { Select } from 'antd'

export default class FormSelect extends PureComponent {

    render() {
        const { typeData = [], value, disable, onChange,data } = this.props
        return (
            <Select
                style={{ width: '100%' }}
                value={value}
                onChange={onChange}
                disabled={disable}
                {...data.props}
            >
                {
                    typeData.map((e, i) => {
                        return (
                            <Select.Option
                                value={e.value}
                                key={i}
                            >
                                {e.name}
                            </Select.Option>
                        )
                    })
                }
            </Select>
        )
    }
}
