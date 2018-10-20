import { ImageFormatsTypes, ImagesSizesInterface } from '../ImageConfig'

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
  return formats.reduce<FilesArray>(
    (previousArray: FilesArray, format: ImageFormatsTypes) => {
      const files: FilesArray = Object.keys(imagesSizes).map(type => ({
        thumbName: `${type}-${newFileName}.${format}`,
        size: imagesSizes[type],
        type,
        format,
      }))
      return [...previousArray, ...files]
    },
    [],
  )
}
