import { strEnumHelper } from '../../../utils/strEnumHelper'

export interface UploadState {
  active: boolean
  baseTransferred: number
  currentFileName: string
  filesCount: number
  filesUploaded: number
  progress: number
  size: number
  transferred: number
}

export const Controls = strEnumHelper(['pause', 'cancel', 'resume'])

export type Controls = keyof typeof Controls

