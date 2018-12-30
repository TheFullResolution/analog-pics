import * as fAdmin from 'firebase-admin'
import { Bucket as BucketType, File as FileType } from '@google-cloud/storage'
import { Response } from 'request'
import { ObjectMetadata } from 'firebase-functions/lib/providers/storage'

export type Admin = fAdmin.app.App
export type Firestore = fAdmin.firestore.Firestore
export type Storage = fAdmin.storage.Storage
export type Bucket = BucketType
export type Metadata = ObjectMetadata
export type BucketFile = FileType
export type BucketResponse = Response
export type RuntimeOptions = {
  timeoutSeconds?: number
  memory?: '128MB' | '256MB' | '512MB' | '1GB' | '2GB'
}

const admin = fAdmin.initializeApp()

const fireStore = admin.firestore()
fireStore.settings({ timestampsInSnapshots: true })

const storage = admin.storage()

import * as storageFunctions from './storage'
import { photos as photosFunction } from './http'

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 300,
  memory: '512MB',
}

export const onImageUpload = storageFunctions.onImageUpload({
  storage,
  fireStore,
  runtimeOpts,
})
export const photos = photosFunction({ admin })
