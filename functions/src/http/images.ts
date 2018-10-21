import * as functions from 'firebase-functions'
import * as corsCreator from 'cors'
import { Storage } from '../index'
import { join } from 'path'

const cors = corsCreator({ origin: true })

interface Images {
  storage: Storage
}

export const images = ({ storage }: Images) =>
  functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
      if (req.method !== 'GET') {
        return res.status(500).json({
          message: 'Not allowed',
        })
      }

      console.log({ path: join('images', req.path)})

      const bucket = storage.bucket('analog-pics-a1a3b.appspot.com')
      const urls = await bucket.file(join('images', req.path)).getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
      })

      console.log({ urls })

      return res.status(200).send(urls[0])
    })
  })
