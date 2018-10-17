import { ObjectMetadata } from 'firebase-functions/lib/providers/storage'
import { IS_PROCESSED } from '../ImageConfig'

interface CheckIfProcessed {
  readonly object: ObjectMetadata
}

export const checkIfProcessed = function checkIfProcessedFunc({object}: CheckIfProcessed) {

  console.log('This is processed.');

  return !!object.metadata && object.metadata[IS_PROCESSED]
}
