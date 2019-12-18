import { ADD_SELECTION, CLEAR_SELECTION, REMOVE_SELECTION, SelectActions } from './select.actions';
import types from '_types_';

export interface State {
  active: boolean
  data: types.DataBaseEntryWithId[]
}

const initialState: State = {
  active: false,
  data: [],
};

export function selectReducer(state = initialState, action: SelectActions) {
  switch (action.type) {
    case ADD_SELECTION:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        active: true,
      };
    case REMOVE_SELECTION:
      const newData = state.data.filter(el => el.id !== action.payload.id);
      const newActive = newData.length !== 0;
      return {
        ...state,
        data: newData,
        active: newActive,
      };
    case CLEAR_SELECTION:
      return initialState;
    default:
      return state;
  }
}
