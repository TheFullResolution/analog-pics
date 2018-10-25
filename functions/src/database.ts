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
  payload?: typeof photosDataBaseDefault
}

const photosDataBaseReducer = ({ type, payload }: UpdatePhotosDataBase) => {
  switch (type) {
    case UpdateType.reset:
      return photosDataBaseDefault

    case UpdateType.update:
      return payload
  }
}

export let photosDataBase

export const initPhotosDataBase = () => {
  photosDataBase = { ...photosDataBaseDefault }
}

export const updatePhotosDataBase = (update: UpdatePhotosDataBase) => {
  photosDataBase = { ...photosDataBaseReducer(update) }
}
