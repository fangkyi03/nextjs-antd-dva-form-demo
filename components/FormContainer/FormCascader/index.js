import React, { Component } from "react";
import { Cascader } from "antd";
import apiTool from "../../../command/apiTool";

export default class FormCascader extends Component {
  render() {
    const { typeData = [], value, disable, onChange, ...arg } = this.props;
    return (
      <Cascader
        options={typeData}
        style={{ width: "100%" }}
        value={value}
        disable={disable}
        onChange={onChange}
        placeholder={'请选择'}
      />
    );
  }
}