export interface ImagesSizesInterface {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

export const imagesSizes: ImagesSizesInterface = {
  xs: 512,
  sm: 850,
  md: 1024,
  lg: 1420,
  xl: 2200,
}

export const enum ImageFormats {
  webp = 'webp',
  jpeg = 'jpeg',
  png = 'png',
}
export type ImageFormatsTypes = ImageFormats.webp | ImageFormats.jpeg | ImageFormats.png

export const enum CONSTS {
  IS_PROCESSED = 'isProcessed',
  PATH = 'images',
}

export type DataBaseImageFormats = {
  [K in ImageFormats]?: ImagesSizesInterface
}