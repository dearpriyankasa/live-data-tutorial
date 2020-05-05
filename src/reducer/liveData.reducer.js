import * as ACTION_TYPES from '../actions/liveData.actionTypes';

const initialState = {
  isSubscriptionInitiated: false,
  isSubscriptionCancelled: false,
  isLiveDataSuccess: false,
  isLiveDataFailure: false,
  subscriptionTopic: '',
  liveData: [],
  liveDataError: [],
};

export default function liveData(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.INITIATE_SUBSCRIPTION_TO_TOPIC:
      return {
        ...state,
        isSubscriptionInitiated: true,
        subscriptionTopic: action.payload,
      };
    case ACTION_TYPES.GET_LIVE_DATA_SUCCESS:
      return {
        ...state,
        isLiveDataSuccess: true,
        isLiveDataFailure: false,
        liveData: action.payload,
      };
    case ACTION_TYPES.GET_LIVE_DATA_FAILURE:
      return {
        ...state,
        isLiveDataSuccess: false,
        isLiveDataFailure: true,
        liveDataError: action.payload,
      };
    case ACTION_TYPES.CANCEL_SUBSCRIPTION_TO_TOPIC:
      return {
        ...state,
        isSubscriptionCancelled: true,
        isSubscriptionInitiated: false,
        subscriptionTopic: '',
      };
    default:
      return state;
  }
}
