import React, {useState} from 'react'
import './Navigation.css'
import {
    Layout, Menu, Icon, Button,
  } from 'antd';
import {NavLink, withRouter} from 'react-router-dom' 

const { Header, Sider, Content } = Layout;

function Navigation(props) {
    const [collapsed, setCollapsed] =useState(false)
    const [collapseMargin,setCollapseMargin] = useState(240)
    var theme = "dark"
    const ContentComponent = props.content;

    const handleToggle = () => {
        setCollapsed(prevState => prevState?false:true)
        setCollapseMargin(prevState => prevState===240?80:240)
    }

    return (
        <div>
            <Layout hasSider style={{ minHeight: '100vh' }}>
                <Sider
                className="sider"
                trigger={null}
                collapsible
                collapsed={collapsed}
                width="240px"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    boxShadow: '3px 0 5px rgba(57, 63, 72, 0.6)',
                    zIndex: 101,
                    textAlign : "left"
                }}
                theme={theme}
                >
                <div className="title">
                    {/* <img className="title__logo" alt="logo" src="https://bestofwayanad.com/assets/icons/favicon.png" />
                    <h1>Better CMS</h1> */}
                    <h1 style={{marginLeft : "60px"}}>Admin Site</h1>
                </div>
                <Menu theme={theme} mode="inline">
                    <Menu.SubMenu
                        title={
                            <span>
                                <Icon type="tag" />
                                <span>Products</span>
                                </span>
                        }
                    >
                        <Menu.Item>
                            <NavLink to="/allproducts">
                                <span>All Products</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item>
                            <NavLink to="/addproduct">
                                <span>Add Product</span>
                            </NavLink>
                        </Menu.Item>
                    </Menu.SubMenu>
                    
                    <Menu.Item key="availabletoday">
                        <NavLink to="/availabletoday">
                            <Icon type="appstore" />
                            <span>Available Today</span>
                        </NavLink>
                    </Menu.Item>
                    
                    <Menu.Item key="orders">
                        <NavLink to="/orders">
                            <Icon type="container" />
                            <span>Manage Orders</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="report">
                        <NavLink to="/report">
                            <Icon type="picture" />
                            <span>Report</span>
                        </NavLink>
                    </Menu.Item>
                    
                </Menu>
                </Sider>
                <Layout
                style={{
                    marginLeft: `${collapseMargin}px`,
                }}
                >
                <Header
                    style={{
                    padding: 0,
                    width: '100%',
                    zIndex: 100,
                    textAlign : "left"
                    }}
                >
                    <div className="global-header">
                    <span className="global-header-trigger">
                        <Icon
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={handleToggle}
                        />
                    </span>
                        <Button style={{float : "right", margin : "10px"}} type="primary" onClick={()=>{
                            localStorage.removeItem("adminToken")
                            props.history.push('/')
                        }}>Logout</Button>
                    </div>


                </Header>
                <Content
                    style={{
                    margin: '30px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                    }}
                >
                    <ContentComponent />
                </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default withRouter(Navigation)