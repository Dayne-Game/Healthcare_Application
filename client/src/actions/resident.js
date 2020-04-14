import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_RESIDENTS,
  RESIDENT_ERROR,
  DELETE_RESIDENT,
  ADD_RESIDENT,
  GET_RESIDENT,
  ADD_CONDITION,
  ADD_NOTE,
  UPDATE_RESIDENT,
  DELETE_NOTE,
  ADD_HEARTRATE,
} from './types';

export const getResidents = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/residents`);

    dispatch({
      type: GET_RESIDENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RESIDENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Resident
export const deleteResident = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/api/residents/${id}`);

      dispatch({
        type: DELETE_RESIDENT,
        payload: id,
      });

      dispatch(setAlert('Resident Removed', 'success'));
    } catch (err) {
      dispatch({
        type: RESIDENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Add Resident
export const addResident = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/residents', formData, config);

    dispatch({
      type: ADD_RESIDENT,
      payload: res.data,
    });

    dispatch(setAlert('Resident Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: RESIDENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update Resident
export const updateResident = (residentID, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(
      `/api/residents/${residentID}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_RESIDENT,
      payload: res.data,
    });

    dispatch(setAlert('Resident Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: RESIDENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Resident
export const getResident = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/residents/${id}`);

    dispatch({
      type: GET_RESIDENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RESIDENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Condition
export const addCondition = (residentID, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/api/residents/conditions/${residentID}`,
      formData,
      config
    );

    dispatch({
      type: ADD_CONDITION,
      payload: res.data,
    });

    dispatch(setAlert('Condition Added', 'success'));
  } catch (err) {
    dispatch({
      type: RESIDENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Note
export const addNote = (residentID, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/api/residents/notes/${residentID}`,
      formData,
      config
    );

    dispatch({
      type: ADD_NOTE,
      payload: res.data,
    });

    dispatch(setAlert('Note Added', 'success'));
  } catch (err) {
    dispatch({
      type: RESIDENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Note
export const deleteNote = (residentId, noteId) => async (dispatch) => {
  try {
    await axios.delete(`/api/residents/notes/${residentId}/${noteId}`);

    dispatch({
      type: DELETE_NOTE,
      payload: noteId,
    });

    dispatch(setAlert('Note Removed', 'success'));
  } catch (err) {
    dispatch({
      type: RESIDENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Condition
export const addHeartrate = (residentID, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/api/residents/heartrate/${residentID}`,
      formData,
      config
    );

    dispatch({
      type: ADD_HEARTRATE,
      payload: res.data,
    });

    dispatch(setAlert('Heartrate Added', 'success'));
  } catch (err) {
    dispatch({
      type: RESIDENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
