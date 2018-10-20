import * as admin from 'firebase-admin'
import * as merge from 'lodash.merge'

import { FilesArray } from './generateFileNames'

export const updateDatabase = async (
  filesArray: FilesArray,
  fileName: string,
  fireStore: admin.firestore.Firestore,
) => {
  const filesObject = filesArray.reduce(
    (previousObject, { format, thumbName, size, type }) => {
      return merge(previousObject, {
        [format]: { [type]: { thumbName, size } },
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
