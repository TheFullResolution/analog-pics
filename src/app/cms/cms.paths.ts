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
  auth: boolean;
}

export const routeNames: RouteName[] = [
  {
    path: RoutPath.login,
    label: 'Login',
    icon: '',
    auth: false,
  },
  {
    path: RoutPath.dashboard,
    label: 'Dashboard',
    icon: 'data_usage',
    auth: true,
  },
  {
    path: RoutPath.manage,
    label: 'Manage Pictures',
    icon: 'dynamic_feed',
    auth: true,
  },
  {
    path: RoutPath.upload,
    label: 'Picture Upload',
    icon: 'cloud_upload',
    auth: true,
  },
  {
    path: RoutPath.publish,
    label: 'Publish Pictures',
    icon: 'publish',
    auth: true,
  },
];
