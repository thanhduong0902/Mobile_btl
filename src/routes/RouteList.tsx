// Screen
import Login from "../screens/Auth/Login";
import React, { ReactElement } from "react";
import Job from "../screens/News";

// bottom navbar
import FamiyTree from "src/screens/FamilyTree";
import Members from "src/screens/FamilyTree/Members";
import Event from "src/screens/Event/Event";
import News from "../screens/News";
import Acount from "src/screens/Account";
import CreateNewsScreen from "src/screens/News/CreateNew";
import MemberDetail from "src/screens/FamilyTree/MemberDetail";
import { MainMember } from "src/api/FamilyTree/ApiFamilyTree";
import Album from "src/screens/Album/Album";

export type AppRootParamList = {
  LoginRoute: { param: { from: string } } | undefined;
  MembersRoute: { idTree: number };
  MemberDetailRoute: { id: number, data: MainMember },
  AlbumRoute: { idTree: number }
};
// This registers which makes navigation fully type-safe.
// https://reactnavigation.org/docs/typescript#specifying-default-types-for-usenavigation-link-ref-etc

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList { }
  }
}

interface IRoute {
  component: React.ComponentType<ReactElement>;
  name: string;
  title: string;
  icon?: string;
  isBottom?: boolean;
  isPrivate?: boolean;
  isAuth?: boolean;
}
const routes: IRoute[] = [
  // auth
  {
    component: Login,
    name: "LoginRoute",
    title: "Login",
    isAuth: true,
  },
  // bottom tab
  {
    component: FamiyTree,
    name: "FamilyTreeRoute",
    title: "Gia phả",
    icon: "Tree",
    isBottom: true,
  },
  {
    component: Event,
    name: "EventRoute",
    title: "Sự kiện",
    icon: "Latest_Icon",
    isBottom: true,
  },
  {
    component: News,
    name: "NewsRoute",
    title: "Tin tức",
    icon: "group_building",
    isBottom: true,
  },
  {
    component: Acount,
    name: "AccountRoute",
    title: "Tài khoản",
    icon: "User",
    isBottom: true,
  },
  // screens
  {
    component: Members,
    name: "MembersRoute",
    title: "Thành viên",
  },
  {
    component: CreateNewsScreen,
    name: "CreateNewRoute",
    title: "Thêm tin mới",
  },
  {
    component: MemberDetail,
    name: "MemberDetailRoute",
    title: "Chi tiết thành viên"
  },
  {
    component: Album,
    name: "AlbumRoute",
    title: "Anh gia dinh"
  }

];

export default routes;
