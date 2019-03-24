import * as functions from 'firebase-functions'
import * as fs from 'fs-extra'
import { join } from 'path'
import { tmpdir } from 'os'

import { checkIfValid } from '../checks/checkIfValid'
import { checkIfProcessed } from '../checks/checkIfProcessed'
import { createImageResize } from './methods/createImageResize'
import { getFileName } from './methods/getFileName'
import { generateFileNames } from './methods/generateFileNames'
import { updateDatabase } from './methods/updateDatabase'
import { Firestore, Storage, RuntimeOptions, CONSTS, SharedTypes } from '../..'
import { updatePhotosDataBase, UpdateType } from '../../database'

interface OnImageUpload {
  fireStore: Firestore
  storage: Storage
  runtimeOpts: RuntimeOptions
}

function isString(x: any): x is string {
  return typeof x === 'string'
}

export const onImageUpload = ({
  storage,
  fireStore,
  runtimeOpts,
}: OnImageUpload) =>
  functions
    .runWith(runtimeOpts)
    .storage.object()
    .onFinalize(async object => {
      if (checkIfValid({ object })) return null

      if (!isString(object.name)) return null

      if (checkIfProcessed({ object, IS_PROCESSED: CONSTS.IS_PROCESSED })) {
        return null
      }

      const filePath = object.name
      const newFileName = getFileName()
      const bucketName = object.bucket
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
        tempLocalDir,
        tempLocalFile,
        bucket,
        config: { PATH: CONSTS.COLLECTION, IS_PROCESSED: CONSTS.IS_PROCESSED },
      })

      //4. Generate File list for upload
      const filesToGenerate = generateFileNames({
        sizes: CONSTS.IMAGE_SIZES,
        newFileName,
        formats: [SharedTypes.ImageFormat.jpeg, SharedTypes.ImageFormat.webp],
      })
      console.log('Generate File list for upload')

      //5. Format and Upload all the files
      const generateAndUpload = imageResize(filesToGenerate)

      await Promise.all(generateAndUpload)

      await updateDatabase({
        bucketName,
        filesArray: filesToGenerate,
        fileName: newFileName,
        fireStore,
        PATH: CONSTS.COLLECTION,
      })

      await bucket.file(filePath).delete()
      console.log('Format and Upload all the files')

      //6. Update database
      updatePhotosDataBase({ type: UpdateType.reset })
      console.log('Update database')

      return fs.remove(tempLocalDir)
    })
