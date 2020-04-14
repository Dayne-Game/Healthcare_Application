import {
  GET_RESIDENTS,
  RESIDENT_ERROR,
  DELETE_RESIDENT,
  CLEAR_RESIDENT,
  ADD_RESIDENT,
  GET_RESIDENT,
  ADD_CONDITION,
  ADD_NOTE,
  GET_CONDITIONS,
  UPDATE_RESIDENT,
  DELETE_NOTE,
  ADD_HEARTRATE,
} from '../actions/types';

const initalState = {
  residents: [],
  resident: null,
  loading: true,
  error: {},
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RESIDENTS:
      return {
        ...state,
        residents: payload,
        loading: false,
      };
    case GET_RESIDENT:
      return {
        ...state,
        resident: payload,
        loading: false,
      };
    case UPDATE_RESIDENT:
    case ADD_RESIDENT:
      return {
        ...state,
        residents: [payload, ...state.residents],
        loading: false,
      };
    case RESIDENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_RESIDENT:
      return {
        ...state,
        residents: state.residents.filter(
          (resident) => resident._id !== payload
        ),
        loading: false,
      };
    case CLEAR_RESIDENT:
      return {
        ...state,
        residents: [],
        resident: null,
        loading: false,
      };
    case ADD_CONDITION:
      return {
        ...state,
        resident: { ...state.resident, conditions: payload },
        loading: false,
      };
    case ADD_HEARTRATE:
      return {
        ...state,
        resident: { ...state.resident, heartrate: payload },
        loading: false,
      };
    case GET_CONDITIONS:
      return {
        ...state,
        resident: { conditions: payload },
        loading: false,
      };
    case ADD_NOTE:
      return {
        ...state,
        resident: { ...state.resident, notes: payload },
        loading: false,
      };
    case DELETE_NOTE:
      return {
        ...state,
        resident: {
          ...state.resident,
          notes: state.resident.notes.filter((note) => note._id !== payload),
        },
        loading: false,
      };
    default:
      return state;
  }
}
