import * as fAdmin from 'firebase-admin'
import { Bucket as BucketType, File as FileType } from '@google-cloud/storage'
import { ObjectMetadata } from 'firebase-functions/lib/providers/storage'

export type Admin = fAdmin.app.App
export type Firestore = fAdmin.firestore.Firestore
export type Storage = fAdmin.storage.Storage
export type Bucket = BucketType
export type Metadata = ObjectMetadata
export type BuckeFile = FileType

const admin = fAdmin.initializeApp()

const fireStore = admin.firestore()
fireStore.settings({ timestampsInSnapshots: true })

const storage =  fAdmin.storage()

import * as storageFunctions from './storage'
import {photos as photosFunction} from './http'

export const onImageUpload = storageFunctions.onImageUpload({storage, fireStore})
export const photos = photosFunction({admin})
