import { ImageFormatsTypes, ImagesSizesInterface } from '../../../types'

interface FilesInterface {
  thumbName: string
  size: number
  type: string
  format: ImageFormatsTypes
}

export type FilesArray = FilesInterface[]

interface GenerateFileNames {
  imagesSizes: ImagesSizesInterface
  newFileName: string
  formats: ImageFormatsTypes[]
}

export const generateFileNames = ({
  imagesSizes,
  newFileName,
  formats,
}: GenerateFileNames): FilesArray => {
  return formats.reduce<FilesArray>((previousArray, format) => {

    const files = Object.entries(imagesSizes).map(([key, value]) => ({
      thumbName: `${key}-${newFileName}.${format}`,
      size: value,
      type: key,
      format,
    }))

    return [...previousArray, ...files]
  }, [])
}
