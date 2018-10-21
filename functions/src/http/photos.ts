import * as functions from 'firebase-functions'
import * as corsCreator from 'cors'
import { Admin } from '../index'

const cors = corsCreator({ origin: true })

interface Photos {
  admin: Admin
}

export const photos = ({admin}: Photos) => functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(500).json({
        message: 'Not allowed',
      })
    }

    const collection = await admin
      .firestore()
      .collection('photos')
      .get()

    const result = []

    collection.forEach(doc => {
      result.push({ ...doc.data(), id: doc.id })
    })

    return res.status(200).json({ images: result })
  })
})
