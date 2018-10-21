import * as admin from 'firebase-admin'
import * as merge from 'lodash.merge'

import { FilesArray } from './generateFileNames'
import { join } from "path"
import { Firestore } from '../../index'

export const updateDatabase = async (
  filesArray: FilesArray,
  fileName: string,
  fireStore: Firestore,
  path: string
) => {
  const filesObject = filesArray.reduce(
    (previousObject, { format, thumbName, size, type }) => {

      const file = join(path, thumbName)

      return merge(previousObject, {
        [format]: { [type]: { file, size } },
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
