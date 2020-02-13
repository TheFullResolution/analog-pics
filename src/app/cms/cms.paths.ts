import { strEnumHelper } from './utils/strEnumHelper';


export const BASE = 'cms';
export const RoutPath = strEnumHelper([
  'dashboard',
  'login',
  'upload',
  'publish',
  'manage',
]);
export type RoutPath = keyof typeof RoutPath;

export const getFullPath = (path_string: RoutPath) => `/${BASE}/${path_string}`;

export interface RouteName {
  path: RoutPath;
  label: string;
  icon: string;
  noSideNav?: boolean;
}

export const routeNames: RouteName[] = [
  {
    path: RoutPath.login,
    label: 'Login',
    icon: '',
    noSideNav: true
  },
  {
    path: RoutPath.dashboard,
    label: 'Dashboard',
    icon: 'data_usage'
  },
  {
    path: RoutPath.manage,
    label: 'Manage Pictures',
    icon: 'dynamic_feed'
  },
  {
    path: RoutPath.upload,
    label: 'Picture Upload',
    icon: 'cloud_upload'
  },
  {
    path: RoutPath.publish,
    label: 'Publish Pictures',
    icon: 'publish'
  },
];
