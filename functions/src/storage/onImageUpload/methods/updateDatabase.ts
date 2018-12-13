import * as admin from 'firebase-admin'
import * as merge from 'lodash.merge'

import { FilesArray } from './generateFileNames'
import { BuckeFile, Firestore } from '../../../index'
import { join } from 'path'

interface UpdateDatabase {
  filesArray: FilesArray
  fileName: string
  fireStore: Firestore
  uploads: [BuckeFile][]
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
    {},
  )

  return fireStore.collection('photos').add({
    name: fileName,
    uploaded: admin.firestore.FieldValue.serverTimestamp(),
    ...filesObject,
  })
}
