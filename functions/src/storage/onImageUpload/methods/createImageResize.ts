import { extname, join } from 'path'
import * as sharp from 'sharp'
import * as mime from 'mime-types'

import { FilesArray } from './generateFileNames'
import { CONSTS } from '../../../config'
import { Bucket, Metadata } from '../../../index'

interface CreateImageResize {
  readonly newFileName: string
  readonly tempLocalDir: string
  readonly tempLocalFile: string
  readonly bucket: Bucket
  readonly object: Metadata
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

    const contentType = mime.contentType(extname(thumbPath))

    // Upload to GCS
    return bucket.upload(thumbPath, {
      destination,
      contentType,
      metadata: {
        cacheControl: 'public,max-age=3600',
        metadata: { [IS_PROCESSED]: IS_PROCESSED },
      },
    })
  })
