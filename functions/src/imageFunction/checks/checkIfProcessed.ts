import { ObjectMetadata } from 'firebase-functions/lib/providers/storage'
import { IS_PROCESSED } from '../ImageConfig'

interface CheckIfProcessed {
  readonly object: ObjectMetadata
}

export const checkIfProcessed = function checkIfProcessedFunc({
  object,
}: CheckIfProcessed) {
  const assertion = object.metadata && object.metadata[IS_PROCESSED]

  if (assertion) {
    console.log(`Image Already Processed ${assertion}`)
  }

  return assertion
}
