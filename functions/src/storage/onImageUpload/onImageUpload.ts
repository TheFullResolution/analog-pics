import * as functions from 'firebase-functions'

import { checkIfNotImage } from '../checks/checkIfNotImage'
import { checkIfProcessed } from '../checks/checkIfProcessed'
import { join } from 'path'
import { tmpdir } from 'os'
import * as fs from 'fs-extra'
import { createImageResize } from './methods/createImageResize'
import { getFileName } from './methods/getFileName'
import { CONSTS, ImageFormats, imagesSizes } from '../../types'
import { generateFileNames } from './methods/generateFileNames'
import { updateDatabase } from './methods/updateDatabase'
import { Firestore, Storage } from '../..'
import { updatePhotosDataBase, UpdateType, UpdateTypes } from '../../database'

interface OnImageUpload {
  fireStore: Firestore
  storage: Storage
}

export const onImageUpload = ({ storage, fireStore }: OnImageUpload) =>
  functions.storage.object().onFinalize(async object => {
    if (checkIfNotImage({ object })) return null

    if (checkIfProcessed({ object, IS_PROCESSED: CONSTS.IS_PROCESSED })) {
      return null
    }

    const filePath = object.name
    const newFileName = getFileName()

    const bucket = storage.bucket(object.bucket)

    const tempLocalDir = join(tmpdir(), 'thumbs')
    const tempLocalFile = join(tempLocalDir, filePath)

    // 1. Ensure thumbnail dir exists
    await fs.ensureDir(tempLocalDir)

    // 2. Download Source File
    await bucket.file(filePath).download({
      destination: tempLocalFile,
    })

    // 3. Generate function for Upload
    const imageResize = createImageResize({
      newFileName,
      tempLocalDir,
      tempLocalFile,
      object,
      bucket,
      config: { PATH: CONSTS.PATH, IS_PROCESSED: CONSTS.IS_PROCESSED },
    })

    //4. Generate File list for upload
    const filesToGenerate = generateFileNames({
      imagesSizes,
      newFileName,
      formats: [ImageFormats.jpeg, ImageFormats.webp],
    })

    //5. Format and Upload all the files
    const generateAndUpload = imageResize(filesToGenerate)

    const uploads = await Promise.all(generateAndUpload)

    await updateDatabase({
      filesArray: filesToGenerate,
      fileName: newFileName,
      fireStore,
      uploads,
      PATH: CONSTS.PATH,
    })

    await bucket.file(filePath).delete()

    updatePhotosDataBase({ type: UpdateType.reset })

    return fs.remove(tempLocalDir)
  })