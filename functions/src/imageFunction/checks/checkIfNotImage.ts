import { ObjectMetadata } from 'firebase-functions/lib/providers/storage'

interface CheckIfImage {
  readonly object: ObjectMetadata
}

export const checkIfNotImage = function checkIfImageFunction({
  object,
}: CheckIfImage): boolean {
  const assertion = !object.contentType.includes('image')

  if (assertion) {
    console.log(`Not Image ${assertion}`)
  }

  return assertion
}
