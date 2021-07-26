import React from "react";
import loadable from "@loadable/component";
//antd에서 아이콘 가져오기
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
//회원 전용 루트
import { PUBLIC_ROUTE } from "./routes.constants";
import { Redirect } from "react-router";

//로그인 없이 이용가능 페이지
export const publicRoutes = [
  //첫시작 로그인으로 설정 => ('/' 해당 url 사용 안함)
  {
    exact: true,
    path: PUBLIC_ROUTE.ROOT,
    component: () => <Redirect to="/login" />,
  },
  {
    exact: true,
    path: PUBLIC_ROUTE.LOGIN,
    component: loadable(() => import("../pages/auth/Login")),
  },
];

//로그인 시에만 이용가능 페이지
export const privateRoutes = [
  // {
  //   //큰 메뉴
  //   exact: true,
  //   path: "/friend",
  //   sidebar: {
  //     icon: <TeamOutlined />,
  //     label: "Friends",
  //   },
  //   //하단 메뉴
  //   children: [
  //     {
  //       exact: true,
  //       path: "",
  //       //제목이 나오는 페이지
  //       sidebar: {
  //         label: "Friends",
  //       },
  //       //../pages/friend/index 로 연결
  //       component: loadable(() => import("../pages/friend")),
  //     },
  //     {
  //       exact: true,
  //       visible: false,
  //       path: "/:userId",
  //       //sidebar 없을시 하단 메뉴에 안 나옴(상세페이지 같은 곳에 쓰임)
  //       component: loadable(() => import("../pages/friend/Info")),
  //     },
  //   ],
  // },
];
