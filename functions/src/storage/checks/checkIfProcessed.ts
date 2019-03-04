import { ObjectMetadata } from 'firebase-functions/lib/providers/storage'
import { CONSTS } from '../..';


interface CheckIfProcessed {
  readonly object: ObjectMetadata
  readonly IS_PROCESSED: typeof CONSTS.IS_PROCESSED
}

export const checkIfProcessed = function checkIfProcessedFunc({
  object,
  IS_PROCESSED,
}: CheckIfProcessed) {
  const assertion = object.metadata && object.metadata[IS_PROCESSED]

  if (assertion) {
    console.log(`Image Already Processed: ${assertion}`)
  }

  return assertion
}
