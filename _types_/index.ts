import { FieldValue } from '../functions/src/index';

export interface ImagesSizesInterface {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export const imagesSizes: ImagesSizesInterface = {
  xs: 512,
  sm: 850,
  md: 1024,
  lg: 1420,
  xl: 2200,
};

export const enum ImageFormats {
  webp = 'webp',
  jpeg = 'jpeg',
}
export type ImageFormatsTypes =
  | ImageFormats.webp
  | ImageFormats.jpeg;

export const enum CONSTS {
  IS_PROCESSED = 'isProcessed',
  PATH = 'images',
}

export interface DataBaseImageObject {
  name: string;
  size: number;
  downloadUrl?: string;
}

export type DataBaseImageSizes = {
  [T in keyof ImagesSizesInterface]: DataBaseImageObject
};

export type DataBaseImageFormats = {
  [K in ImageFormats]: DataBaseImageSizes
};

export type DataBaseEntry = {
  name: string
  published: boolean
  uploaded: FieldValue
} & DataBaseImageFormats;
