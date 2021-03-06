import { put } from 'redux-saga/effects'
import axios from '../../axios-conf'
import {
  proxyFetchSuccess,
  proxyFetchFailure,
  addNotification
} from '../actions'
import { uiConstants } from '../../constants'
import { uiHelper } from '../../helpers'

export function* proxyFetchSaga(action) {
  try {
    const result = yield axios({
      method: action.payload.method,
      url: action.payload.url,
      data: action.payload.data
    })
    yield put(
      proxyFetchSuccess({ value: result.data, key: action.payload.key })
    )
  } catch (error) {
    yield put(proxyFetchFailure(error))
    yield put(
      addNotification(
        uiHelper.errorMessage(error),
        uiConstants.notification.error
      )
    )
  }
}
