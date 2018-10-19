import { ImageFormatsTypes, ImagesSizesInterface } from '../ImageConfig'

interface FilesInterface {
  thumbName: string
  size: number
  type: string
}

interface FilesArrayInterface {
  format: ImageFormatsTypes
  files: FilesInterface[]
}

export type FilesArray = FilesArrayInterface[]

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
  return formats.map(format => ({
    format,
    files: Object.keys(imagesSizes).map(type => ({
      thumbName: `${type}-${newFileName}.${format}`,
      size: imagesSizes[type],
      type,
    })),
  }))
}
