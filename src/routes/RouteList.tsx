// Screen
import Login from "../screens/Auth/Login";
import React, {ReactElement} from "react";
import Live from "../screens/Event/Event";
import Job from "../screens/Job";

// bottom navbar
import Study from "../screens/Study";
import FamiyTree from "src/screens/FamilyTree";
import Event from "../screens/Event/Event";

export type AppRootParamList = {
  LoginRoute: {param: {from: string}} | undefined;
};
// This registers which makes navigation fully type-safe.
// https://reactnavigation.org/docs/typescript#specifying-default-types-for-usenavigation-link-ref-etc

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
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
    component: Job,
    name: "JobRoute",
    title: "Jobs",
    icon: "group_building",
    isBottom: true,
  },
];

export default routes;
