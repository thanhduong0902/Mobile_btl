// Screen
import Login from "../screens/Auth/Login";
import React, {ReactElement} from "react";
import Live from "../screens/Live/Live";
import Job from "../screens/Job";

// bottom navbar
import Study from "../screens/Study";

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
    component: Study,
    name: "StudyRoute",
    title: "E-Learning",
    icon: "e-computer",
    isBottom: true,
  },
  {
    component: Live,
    name: "LiveRoute",
    title: "Live",
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
