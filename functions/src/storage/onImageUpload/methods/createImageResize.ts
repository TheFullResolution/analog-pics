import { join } from 'path'
import * as sharp from 'sharp'
import { Bucket } from '@google-cloud/storage'
import { ObjectMetadata } from 'firebase-functions/lib/providers/storage'

import { FilesArray } from './generateFileNames'
import { CONSTS } from '../../../config'

interface CreateImageResize {
  readonly newFileName: string
  readonly tempLocalDir: string
  readonly tempLocalFile: string
  readonly bucket: Bucket
  readonly object: ObjectMetadata
  readonly config: typeof CONSTS
}

export const createImageResize = ({
  newFileName,
  tempLocalFile,
  tempLocalDir,
  object,
  bucket,
  config: { PATH, IS_PROCESSED },
}: CreateImageResize) => (filesArray: FilesArray) =>
  filesArray.map(async ({ thumbName, format, size }) => {
    const thumbPath = join(tempLocalDir, thumbName)
    const destination = join(PATH, thumbName)

    // Resize source image
    await sharp(tempLocalFile)
      .toFormat(format)
      .resize(size, size, { fit: 'inside', withoutEnlargement: true })
      .toFile(thumbPath)

    // Upload to GCS
    return bucket.upload(thumbPath, {
      destination,
      contentType: `image/${format}`,
      metadata: {
        metadata: { [IS_PROCESSED]: IS_PROCESSED },
      },
    })
  })
