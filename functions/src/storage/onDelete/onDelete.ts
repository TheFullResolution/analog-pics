import * as functions from 'firebase-functions';
import { Bucket, CONSTS, RuntimeOptions, SharedTypes, Storage } from '../../index';

interface OnImageUpload {
  storage: Storage
  runtimeOpts: RuntimeOptions
}

async function deleteAllThumbs(
  bucket: Bucket,
  thumbsArray: SharedTypes.DataBaseEntry['thumbs'],
) {
  for (const thumb of thumbsArray) {
    await bucket.file(thumb.name).delete();
  }
}

export const onDelete = ({ storage, runtimeOpts }: OnImageUpload) =>
  functions
    .runWith(runtimeOpts)
    .firestore.document(`${CONSTS.COLLECTION}/{photoId}`)
    .onDelete(async (snap, context) => {
      const deletedValue = snap.data() as SharedTypes.DataBaseEntry;

      if (!deletedValue.bucket || deletedValue.thumbs.length === 0) {
        return null;
      }

      const bucket = storage.bucket(deletedValue.bucket);

      await deleteAllThumbs(bucket, deletedValue.thumbs);
      console.log('thumbs deleted');
      return 'success'
    });
