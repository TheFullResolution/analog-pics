import { strEnumHelper } from '../../../utils/strEnumHelper'

export interface Upload {
  progress: number
  size: number
  transferred: number
}

const Controls = strEnumHelper(['pause', 'cancel', 'resume'])

type Controls = keyof typeof Controls

export { Controls }
