import {
  ImageFormatsTypes,
  ImagesSizes,
  customMetaData,
  PATH,
} from './ImageConfig'
import { join } from 'path'
import * as sharp from 'sharp'
import { Bucket } from '@google-cloud/storage'
import { ObjectMetadata } from 'firebase-functions/lib/providers/storage'

interface CreateImageResize {
  readonly newFileName: string
  readonly tempLocalDir: string
  readonly tempLocalFile: string
  readonly bucket: Bucket
  readonly object: ObjectMetadata
}

export const createImageResize = ({
  newFileName,
  tempLocalFile,
  tempLocalDir,
  object,
  bucket,
}: CreateImageResize) => async (format: ImageFormatsTypes) => {
  const uploadPromises = Object.keys(ImagesSizes).map(async type => {
    const thumbName = `${type}-${newFileName}`
    const thumbPath = join(tempLocalDir, thumbName)

    const size = ImagesSizes[type]
    // Resize source image
    await sharp(tempLocalFile)
      .toFormat(format)
      .resize(size, size)
      .toFile(thumbPath)

    const destination = join(PATH, thumbName)

    // Upload to GCS
    return bucket.upload(thumbPath, {
      destination,
      contentType: object.contentType,
      metadata: { contentType: object.contentType, metadata: customMetaData },
    })
  })

  // 4. Run the upload operations
  return await Promise.all(uploadPromises)
}
