import * as admin from 'firebase-admin'
import { FilesArray } from './generateFileNames'

const reduceFormatObject = (formatObject, currentValue) =>
  (formatObject[currentValue.size] = currentValue.thumbName)

const reduceFilesObject = (filesObject, { format, files }) =>
  (filesObject[format] = files.reduce(reduceFormatObject))

export const updateDatabase = async (
  filesArray: FilesArray,
  fileName: string,
) => {
  const filesObject = filesArray.reduce(reduceFilesObject, {})

  return await admin
    .firestore()
    .collection('photos')
    .add({
      name: fileName,
      uploaded: admin.firestore.FieldValue.serverTimestamp(),
      ...filesObject,
    })
}
