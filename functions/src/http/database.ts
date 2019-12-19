import { HttpGetResponse } from '../_types_';

export const photosDataBaseDefault = {
  date: '',
  items: [],
};

export const enum UpdateType {
  reset = 'reset',
  update = 'update',
}

interface UpdatePhotosReset {
  type: UpdateType.reset
}

interface UpdatePhotosUpdate {
  type: UpdateType.update
  payload: HttpGetResponse
}

const photosDataBaseReducer = (update: UpdatePhotosUpdate | UpdatePhotosReset) => {
  switch (update.type) {
    case UpdateType.reset:
      return photosDataBaseDefault;

    case UpdateType.update:
      return update.payload;

    default:
      return photosDataBaseDefault;
  }
};

export let photosDataBase: HttpGetResponse;


export const initPhotosDataBase = () => {
  photosDataBase = { ...photosDataBaseDefault };
};

export function updatePhotosDataBase(
  update:
    | { type: UpdateType.reset }
    | { type: UpdateType.update; payload: any },
) {
  photosDataBase = { ...photosDataBaseReducer(update) };
}
