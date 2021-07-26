import React, { useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { Layout, Menu, Popover } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { privateRoutes } from "../routes/routes";
import constant from "../data/constant";
import { useLogout } from "../recoil/auth";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const ServiceWrapper = ({ children }) => {
  const logout = useLogout();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisibleProfilePopover, setIsVisibleProfilePopover] = useState(false);

  return (
    <Layout>
      <Sider
        collapsed={isCollapsed}
        onCollapse={(collapsedState) => setIsCollapsed(collapsedState)}
        width={260}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          background: "white",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        {!isCollapsed && (
          <LogoImage src="https://via.placeholder.com/179x74.png" />
        )}
        <Menu
          mode="inline"
          activeKey={location.pathname}
          defaultOpenKeys={[location.pathname]}
          selectedKeys={[location.pathname]}
        >
          {privateRoutes.map((parentRoute) =>
            parentRoute.children ? (
              <SubMenu
                key={parentRoute.path}
                icon={Object(parentRoute.sidebar).icon}
                title={Object(parentRoute.sidebar).label}
                style={{ fontSize: 14 }}
              >
                {parentRoute.children.map(
                  ({ visible = true, ...childrenRoute }) =>
                    visible && (
                      <Menu.Item
                        key={`${parentRoute.path}${childrenRoute.path}`}
                        icon={Object(childrenRoute.sidebar).icon}
                      >
                        <NavLink
                          to={`${parentRoute.path}${childrenRoute.path}`}
                          className="nav-text"
                          style={{ fontSize: 14 }}
                        >
                          {Object(childrenRoute.sidebar).label}
                        </NavLink>
                      </Menu.Item>
                    )
                )}
              </SubMenu>
            ) : (
              <Menu.Item
                key={parentRoute.path}
                icon={Object(parentRoute.sidebar).icon}
              >
                <NavLink
                  to={parentRoute.path}
                  className="nav-text"
                  style={{ fontSize: 14 }}
                >
                  {Object(parentRoute.sidebar).label}
                </NavLink>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout
        style={{
          marginLeft: isCollapsed ? 80 : 260,
          transition: "all 0.2s",
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 15px",
            backgroundColor: "white",
            boxShadow: "0 2px 8px #f0f1f2",
          }}
        >
          <MenuOutlined
            style={{ fontSize: 20 }}
            onClick={() => setIsCollapsed((prevState) => !prevState)}
          />
          <Popover
            trigger="click"
            placement="bottomRight"
            content={
              <PopoverContents>
                <span
                  onClick={() => logout()}
                  style={{ color: "black", cursor: "pointer" }}
                >
                  로그아웃
                </span>
              </PopoverContents>
            }
            visible={isVisibleProfilePopover}
            onVisibleChange={(visibleState) =>
              setIsVisibleProfilePopover(visibleState)
            }
          ></Popover>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>{constant.footerText}</Footer>
      </Layout>
    </Layout>
  );
};

const ProfileImage = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  cursor: pointer;
`;

const PopoverContents = styled.div`
  width: 150px;
`;

const LogoImage = styled.img`
  width: 100%;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  padding: 40px;
`;

export default ServiceWrapper;
