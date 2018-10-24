import * as functions from 'firebase-functions'
import * as corsCreator from 'cors'
import { Admin } from '../index'

const cors = corsCreator({ origin: true })

const ONE_HOUR = 3600000
const ONE_DAY = 24 * ONE_HOUR

interface Photos {
  admin: Admin
}

const result = {
  date: '',
  items: null,
}

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
      
      if (
        result.items &&
        result.items.length > 0 &&
        elapsed(result.date) < ONE_DAY
      ) {
        console.log('CASHED')
        return res.status(200).json({ database: result })
      }

      const collection = await admin
        .firestore()
        .collection('photos')
        .get()

      const newData = []

      collection.forEach(doc => {
        newData.push({ ...doc.data(), id: doc.id })
      })

      result.date = new Date(Date.now()).toISOString()
      result.items = [...newData]

      console.log('NOT CASHED')
      return res.status(200).json({ images: result })
    })
  })
