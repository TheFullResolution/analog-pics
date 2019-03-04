import { ObjectMetadata } from 'firebase-functions/lib/providers/storage'

interface CheckIfImage {
  readonly object: ObjectMetadata
}

export const checkIfValid = function checkIfImageFunction({
  object,
}: CheckIfImage): boolean {
  const assertion = !!(
    object &&
    object.contentType &&
    !object.contentType.includes('image')
  )

  if (assertion) {
    console.log(`Not Image: ${assertion}`)
  }

  return assertion
}
