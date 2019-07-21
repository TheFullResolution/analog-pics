export type ImageSizeTypes = 'xs' | 'sm' | 'md' |'lg' | 'xl';

type ImagesSizesGeneric<K extends string>  = { [key in K]: number };

export type ImageSizesType = ImagesSizesGeneric<ImageSizeTypes>;


export const enum ImageFormat {
  webp = 'webp',
  jpeg = 'jpeg',
}
export type ImageFormatsTypes =
  | ImageFormat.webp
  | ImageFormat.jpeg;

export const enum CONSTS {
  IS_PROCESSED = 'isProcessed',
  PATH = 'images',
}

export interface DataBaseImageObject {
  name: string;
  size: number;
  downloadUrl?: string;
  format: ImageFormatsTypes;
  type: ImageSizeTypes;
}

export interface DataBaseEntry {
  name: string;
  bucket: string;
  published: boolean;
  uploaded: any;
  thumbs: DataBaseImageObject[];
}

export type DataBaseEntryWithId = {
  id: string
} & DataBaseEntry;

export type HttpGetResponse = {
  date: string,
  items: DataBaseEntryWithId[]
}