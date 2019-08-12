import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import apiTool from '../../command/apiTool';
const { Header, Footer, Sider, Content } = Layout;
import Router from 'next/router'

export default class BaseLayout extends Component {

  renderHeader = () =>{
    return (
        <Header style={{ padding: 0 }}>
            <div style={{ background:'#001529',color:'white'}}>
            </div>
        </Header>
    )
  }

  onItemDown = (item) =>{
    Router.replace('/' + item.router)
  }

  renderMenu = (item) =>{
    return (
        <Menu.Item 
            onClick={()=>this.onItemDown(item)}
        >
            <span>{item.name}</span>
        </Menu.Item>
    )
  }

  renderMenuGroup = (item) => {
    return (
        <Menu.SubMenu
            title={item.name}
        >
            {
                item.children.map((e)=>{
                    return this.renderMenu(e)
                })
            }
        </Menu.SubMenu>
    )
  }

  renderLeftMenu = () => {
    const data = [
        {
            name:'场景体验',
            children:[
                {
                    name:'常见场景',
                    router:'demo1'
                }
            ]
        },
        {
            name:'性能测试',
            children:[
                {
                    name: '1k编辑框',
                    router: 'demo2'
                },
                {
                    name:'2k编辑框',
                    router:'demo3'
                },
            ]
        }
    ]
    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {
                data.map((e)=>{
                    return e.children && e.children.length > 0 ? this.renderMenuGroup(e) : this.renderMenu(e)
                })
            }
        </Menu>
    )
  }

  render() {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw'}}>
            <Sider
            >
                {this.renderLeftMenu()}
            </Sider>
            <Layout>
                <div style={{ maxHeight: '100%',overflow:'hidden',overflowY:'scroll' }}>
                    {this.renderHeader()}
                    <Content style={{margin:apiTool.getSize(24),background: 'white', padding: apiTool.getSize(24) }}>{this.props.children}</Content>
                </div>
            </Layout>
        </div>
    )
  }
}
