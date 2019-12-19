import * as functions from 'firebase-functions';
import * as corsCreator from 'cors';
// @ts-ignore
import * as ms from 'ms';
import { Admin, CONSTS, SharedTypes } from '../index';
import { initPhotosDataBase, photosDataBase, updatePhotosDataBase, UpdateType } from './database';

const cors = corsCreator({ origin: true });


interface Photos {
  admin: Admin
}

type DataBaseField = keyof SharedTypes.DataBaseEntry

initPhotosDataBase();

function elapsed(date: string) {
  const then = new Date(date);
  const now = new Date(Date.now());
  return now.getTime() - then.getTime();
}

export const photos = ({ admin }: Photos) =>
  functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
      if (req.method !== 'GET') {
        return res.status(500).json({
          message: 'Not allowed',
        });
      }

      res.set(
        'Cache-Control',
        `public, max-age=${ms('1 min') / 1000}, s-maxage=${ms('1 min') / 1000}`,
      );

      if (
        photosDataBase.items &&
        photosDataBase.items.length > 0 &&
        elapsed(photosDataBase.date) < ms('1 min')
      ) {
        console.log('CASHED');
        return res.status(200).json({ ...photosDataBase });
      }

      const where: DataBaseField = 'published';
      const orderBy: DataBaseField = 'uploaded';

      const collection = await admin
        .firestore()
        .collection(CONSTS.COLLECTION)
        .where(where, '==', true)
        .orderBy(orderBy, 'desc')
        .get();

      const newData: any = [];

      collection.forEach(doc => {
        const { bucket, ...data } = doc.data();
        newData.push({ ...data, id: doc.id });
      });

      updatePhotosDataBase({
        type: UpdateType.update,
        payload: {
          date: new Date(Date.now()).toISOString(),
          items: [...newData],
        },
      });

      console.log('NOT CASHED');

      return res.status(200).json({ ...photosDataBase });
    });
  });
