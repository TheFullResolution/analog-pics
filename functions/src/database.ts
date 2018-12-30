export type PhotosDataBase = {
  date: string,
  items: null | Array<Object>,
}

export const photosDataBaseDefault = {
  date: '',
  items: null,
}

export const enum UpdateType {
  reset = 'reset',
  update = 'update',
}

export type UpdateTypes = UpdateType.reset | UpdateType.update

interface UpdatePhotosDataBase {
  type: UpdateTypes
  payload?: any
}

const photosDataBaseReducer = ({ type, payload }: UpdatePhotosDataBase) => {
  switch (type) {
    case UpdateType.reset:
      return photosDataBaseDefault

    case UpdateType.update:
      return payload

    default:
      return photosDataBaseDefault
  }
}

export let photosDataBase: PhotosDataBase

export const initPhotosDataBase = () => {
  photosDataBase = { ...photosDataBaseDefault }
}

export function updatePhotosDataBase(
  update:
    | { type: UpdateType.reset }
    | { type: UpdateType.update; payload: any },
) {
  photosDataBase = { ...photosDataBaseReducer(update) }
}
