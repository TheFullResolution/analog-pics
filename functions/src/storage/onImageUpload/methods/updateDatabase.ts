import * as admin from 'firebase-admin'
import merge = require('lodash.merge')

import { FilesArray } from './generateFileNames'
import { BucketFile, Firestore, BucketResponse } from '../../../index'
import { join } from 'path'
import { DataBaseImageFormats } from '../../../types';

interface UpdateDatabase {
  filesArray: FilesArray
  fileName: string
  fireStore: Firestore
  uploads: [BucketFile, BucketResponse][]
  PATH: string
}

export const updateDatabase = async ({
  filesArray,
  fileName,
  fireStore,
  uploads,
  PATH,
}: UpdateDatabase) => {
  const paths = uploads.map(([file]) => {
    return { name: file.name }
  })

  const filesObject = filesArray.reduce(
    (previousObject, { format, thumbName, size, type }) => {
      const bucketName = join(PATH, thumbName)

      const file = paths.find(el => el.name === bucketName)

      return merge(previousObject, {
        [format]: { [type]: { size, ...file } },
      })
    },
    {} as DataBaseImageFormats,
  )

  return fireStore.collection('photos').add({
    name: fileName,
    published: false,
    uploaded: admin.firestore.FieldValue.serverTimestamp(),
    ...filesObject,
  })
}
