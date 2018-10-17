import { ObjectMetadata } from 'firebase-functions/lib/providers/storage'

interface CheckIfImage {
  readonly object: ObjectMetadata
}

export const checkIfNotImage = function checkIfImageFunction({
  object,
}: CheckIfImage): boolean {

  console.log('This is not an image.');

  return !object.contentType.includes('image')
}
