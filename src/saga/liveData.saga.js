import { take, takeEvery, put, call } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import * as ACTIONS from '../actions/liveData.actions';
import * as ACTION_TYPES from '../actions/liveData.actionTypes';
import AuthClass from '../AuthClass';

function startEventChannel(topic) {
  const authClass = new AuthClass();
  return eventChannel(emitter => {
    const task = authClass.getDataFromTopic(topic).subscribe({
      next: (data) => {
        emitter({ value: data.value });
      },
      error: (error) => emitter(error),
      close: () => emitter(END),
    });
    // The subscriber must return an unsubscribe function
    return () => {
      task.unsubscribe();
    };
  });
}

export function* initiateLiveDataSubscription(action) {
  const authClass = new AuthClass();
  yield authClass.connectToMQTT();
  const channel = yield call(startEventChannel, action.payload);
  yield takeEvery(channel, function*({ value }) {
    try {
      yield put(ACTIONS.getLiveDataSuccess(value));
    } catch (error) {
      yield put(ACTIONS.getLiveDataFailure(error));
    }
  });
  yield take(ACTION_TYPES.CANCEL_SUBSCRIPTION_TO_TOPIC);
  channel.close();
}

export default function* watcherSaga() {
  yield takeEvery(
    ACTION_TYPES.INITIATE_SUBSCRIPTION_TO_TOPIC,
    initiateLiveDataSubscription
  );
}