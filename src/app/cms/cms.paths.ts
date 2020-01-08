import { strEnumHelper } from './utils/strEnumHelper';

export const BASE = 'cms';
export const RoutPath = strEnumHelper([
  'dashboard',
  'login',
  'upload',
  'publish',
  'manage'
]);
export type RoutPath = keyof typeof RoutPath

export const getFullPath = (path_string: RoutPath) => `/${BASE}/${path_string}`;

export interface RouteName {
  path: RoutPath
  label: string
  icon: string
  component: any
  auth: boolean
}
