import * as fAdmin from 'firebase-admin'

export type Admin = fAdmin.app.App
export type Firestore = fAdmin.firestore.Firestore
export type Storage = fAdmin.storage.Storage

const admin = fAdmin.initializeApp()

const fireStore = admin.firestore()
fireStore.settings({ timestampsInSnapshots: true })

const storage =  fAdmin.storage()

import {imageFunction} from './imageFunction'
import {photos as photosFunction, images  as imagesFunction} from './http'

export const imageProcess = imageFunction({storage, fireStore})
export const photos = photosFunction({admin})
export const images = imagesFunction({storage})
