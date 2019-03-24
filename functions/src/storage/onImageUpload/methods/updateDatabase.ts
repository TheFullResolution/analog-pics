//@ts-ignore
import * as admin from 'firebase-admin'

import { FilesArray } from './generateFileNames'
import { Firestore, CONSTS, SharedTypes } from '../../../index'
import { join } from 'path'

interface UpdateDatabase {
  filesArray: FilesArray
  fileName: string
  fireStore: Firestore
  bucketName: string
  PATH: string
}

export const updateDatabase = async ({
  bucketName,
  filesArray,
  fileName,
  fireStore,
  PATH,
}: UpdateDatabase) => {
  const thumbsArray = filesArray.map(({ thumbName, ...rest }) => {
    const pathAndName = join(PATH, thumbName)

    return { ...rest, name: pathAndName }
  })

  const upload: SharedTypes.DataBaseEntry = {
    name: fileName,
    bucket: bucketName,
    published: false,
    uploaded: admin.firestore.FieldValue.serverTimestamp(),
    thumbs: thumbsArray,
  }

  return fireStore.collection(CONSTS.COLLECTION).add(upload)
}
