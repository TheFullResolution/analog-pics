import * as admin from 'firebase-admin'
import * as merge from 'lodash.merge'

import { FilesArray } from './generateFileNames'
import { BuckeFile, Firestore } from '../../../index'

interface UpdateDatabase {
  filesArray: FilesArray
  fileName: string
  fireStore: Firestore
  uploads: [BuckeFile][]
}

export const updateDatabase = async ({
  filesArray,
  fileName,
  fireStore,
  uploads,
}: UpdateDatabase) => {
  // const config = {
  //   action: 'read',
  //   expires: '03-01-2500',
  // }

  // const paths = await Promise.all(
  //   uploads.map(async ([file]) => {
  //     const downloadUrl = await file.getSignedUrl(config)
  //
  //     return { name: file.name, downloadUrl }
  //   }),
  // )

  const filesObject = filesArray.reduce(
    (previousObject, { format, thumbName, size, type }) => {
      // const file = paths.find(el => el.name === thumbName)

      return merge(previousObject, {
        [format]: { [type]: { size } },
      })
    },
    {},
  )

  console.log({filesObject})

  return fireStore.collection('photos').add({
    name: fileName,
    uploaded: admin.firestore.FieldValue.serverTimestamp(),
    ...filesObject,
  })
}
