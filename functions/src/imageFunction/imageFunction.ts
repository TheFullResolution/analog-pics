import * as functions from 'firebase-functions'
import * as Storage from '@google-cloud/storage'

import { checkIfNotImage } from './checks/checkIfNotImage'
import { checkIfProcessed } from './checks/checkIfProcessed'
import { dirname, join } from 'path'
import { tmpdir } from 'os'
import * as fs from 'fs-extra'
import { createImageResize } from './imageResize'
import { getFileName } from './utils/getFileName'
import { ImageFormats } from './ImageConfig'

const gcs = new Storage()

export const imageFunction = functions.storage
  .object()
  .onFinalize(async object => {
    if (checkIfNotImage({ object })) return null
    if (checkIfProcessed({ object })) return null

    const filePath = object.name
    const newFileName = getFileName()

    const bucket = gcs.bucket(object.bucket)

    const tempLocalFile = join(tmpdir(), filePath)
    const tempLocalDir = dirname(tempLocalFile)

    // 1. Ensure thumbnail dir exists
    await fs.ensureDir(tempLocalDir)

    // 2. Download Source File
    await bucket.file(filePath).download({
      destination: tempLocalFile,
    })

    const imageResize = createImageResize({
      newFileName,
      tempLocalDir,
      tempLocalFile,
      object,
      bucket,
    })

    await Promise.all([
      imageResize(ImageFormats.jpeg),
      imageResize(ImageFormats.webp),
    ])
  })
