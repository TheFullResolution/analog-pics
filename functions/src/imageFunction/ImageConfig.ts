interface ImagesSizesInterface {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

export const ImagesSizes: ImagesSizesInterface = {
  xs: 512,
  sm: 850,
  md: 1024,
  lg: 1420,
  xl: 2200
}

export type ImageFormatsTypes = 'webp' | 'jpeg' | 'png'

export const enum ImageFormats {
  webp = 'webp',
  jpeg = 'jpeg',
  png = 'png',
}


export const IS_PROCESSED = 'isProcessed'
export const customMetaData = {[IS_PROCESSED]: IS_PROCESSED}


export const PATH = 'pictures'
