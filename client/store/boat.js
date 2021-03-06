import axios from 'axios';
import history from '../history';
import { combineReducers } from 'redux';

/**
 * ACTION TYPES
 */
const GET_BOATS = 'GET_BOATS';
const GET_SINGLE_BOAT = 'GET_SINGLE_BOAT';
const GET_UPDATE_QUANTITY = 'GET_UPDATE_QUANTITY';

const initialState = {};

/**
 * ACTION CREATORS
 */
const getBoats = boats => ({ type: GET_BOATS, boats });

const gotSingleBoat = boat => ({
  type: GET_SINGLE_BOAT,
  boat,
});

const gotUpdateQuantity = boat => ({
  type: GET_UPDATE_QUANTITY,
  boat,
});

/**
 * THUNK CREATORS
 */
export const getAllBoats = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/boats');
    dispatch(getBoats(data));
  } catch (err) {
    console.error(err);
  }
};

export const getSingleBoat = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/boats/${id}`);
      dispatch(gotSingleBoat(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const increaseQuantity = id => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/boats/${id}/increase`);
      dispatch(gotUpdateQuantity(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const decreaseQuantity = id => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/boats/${id}/decrease`);
      dispatch(gotUpdateQuantity(data));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */
function allBoatsReducer(boats = [], action) {
  switch (action.type) {
    case GET_BOATS:
      return action.boats;
    case GET_UPDATE_QUANTITY:
      return boats.map(boat =>
        boat.id === action.boat.id ? action.boat : boat
      );
    default:
      return boats;
  }
}

function singleBoatReducer(boat = {}, action) {
  switch (action.type) {
    case GET_SINGLE_BOAT:
      return action.boat;
    case GET_UPDATE_QUANTITY:
      return action.boat;
    default:
      return boat;
  }
}

const rootReducer = combineReducers({
  allBoats: allBoatsReducer,
  singleBoat: singleBoatReducer,
});

export default rootReducer;
