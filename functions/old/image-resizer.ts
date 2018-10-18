import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as Storage from '@google-cloud/storage'
import * as sharp from 'sharp'
import * as fs from 'fs-extra'

const gcs = new Storage()

import { tmpdir } from 'os'
import { join, dirname } from 'path'

import { ImagesSizes } from '../src/imageFunction/ImageConfig'

admin.initializeApp()

export const imageres = functions.storage
  .object()
  .onFinalize(async object => {
    const filePath = object.name
    const fileName = filePath.split('/').pop()

    if (
      !object.contentType.includes('image')
    ) {
      console.log('exiting function')
      return null
    }

    const bucket = gcs.bucket(object.bucket)
    const bucketDir = dirname(filePath)

    const workingDir = join(tmpdir(), 'thumbs')
    const tmpFilePath = join(workingDir, 'source.png')

    // 1. Ensure thumbnail dir exists
    await fs.ensureDir(workingDir)

    // 2. Download Source File
    await bucket.file(filePath).download({
      destination: tmpFilePath,
    })

    // 3. Resize the images and define an array of upload promises

    const thumbObject = {}

    const uploadPromises = Object.keys(ImagesSizes).map(async type => {
      const thumbName = `${''}${type}-${fileName}`
      const thumbPath = join(workingDir, thumbName)
      const size = ImagesSizes[type]
      // Resize source image
      await sharp(tmpFilePath)
        .resize(size, size)
        .toFile(thumbPath)

      const destination = join(bucketDir, thumbName)

      thumbObject[type] = destination

      // Upload to GCS
      return bucket.upload(thumbPath, {
        destination,
        contentType: object.contentType,
        metadata: { contentType: object.contentType },
      })
    })

    // 4. Run the upload operations
    await Promise.all(uploadPromises)

    // 5. Write to DataBase
    await admin
      .firestore()
      .collection('photos')
      .add({
        name: fileName,
        uploaded: admin.firestore.FieldValue.serverTimestamp(),
        original: filePath,
        thumbs: { ...thumbObject },
      })

    // 5. Cleanup remove the tmp/thumbs from the filesystem
    return fs.remove(workingDir)
  })
