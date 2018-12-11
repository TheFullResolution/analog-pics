import * as functions from 'firebase-functions'
import * as corsCreator from 'cors'
import { Admin } from '../index'
import {
  initPhotosDataBase,
  photosDataBase,
  updatePhotosDataBase,
  UpdateType,
} from '../database'

const cors = corsCreator({ origin: true })

const ONE_HOUR_MS = 3600000
const ONE_MINUTE_S = 60
const TEN_MINUTE_S = 10 * ONE_MINUTE_S
const ONE_HOUR_S = 60 * ONE_MINUTE_S
const ONE_DAY_S = 24 * ONE_HOUR_S

interface Photos {
  admin: Admin
}

initPhotosDataBase()

function elapsed(date: string) {
  const then = new Date(date)
  const now = new Date(Date.now())
  return now.getTime() - then.getTime()
}

export const photos = ({ admin }: Photos) =>
  functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
      if (req.method !== 'GET') {
        return res.status(500).json({
          message: 'Not allowed',
        })
      }

      res.set(
        'Cache-Control',
        `public, max-age=${ONE_MINUTE_S}, s-maxage=${ONE_MINUTE_S}`,
      )

      if (
        photosDataBase.items &&
        photosDataBase.items.length > 0 &&
        elapsed(photosDataBase.date) < ONE_HOUR_MS
      ) {
        console.log('CASHED')
        return res.status(200).json({ database: photosDataBase })
      }

      const collection = await admin
        .firestore()
        .collection('photos')
        .get()

      const newData = []

      collection.forEach(doc => {
        newData.push({ ...doc.data(), id: doc.id })
      })

      updatePhotosDataBase({
        type: UpdateType.update,
        payload: {
          date: new Date(Date.now()).toISOString(),
          items: [...newData],
        },
      })

      console.log('NOT CASHED')

      return res.status(200).json({ images: photosDataBase })
    })
  })
