import * as ACTION_TYPES from './liveData.actionTypes';

export const initialiseLiveDataSaga = (topic) => {
  return {
    type: ACTION_TYPES.INITIATE_SUBSCRIPTION_TO_TOPIC,
    payload: topic,
  };
};

export const getLiveDataSuccess = (data) => {
  return {
    type: ACTION_TYPES.GET_LIVE_DATA_SUCCESS,
    payload: data,
  };
};

export const getLiveDataFailure = (error) => {
  return {
    type: ACTION_TYPES.GET_LIVE_DATA_FAILURE,
    payload: error,
  };
};

export const cancelSubscription = () => {
  return {
    type: ACTION_TYPES.CANCEL_SUBSCRIPTION_TO_TOPIC,
  };
};