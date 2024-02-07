import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import { questionReducer } from './questionsReducer'

import {thunk} from 'redux-thunk'
import {  gamePlayReducer } from './gamePlayReducer'
import { settingsReducer } from './settingsReducer'
const reducers = combineReducers({
    questionStore: questionReducer,
    gamplayStore: gamePlayReducer,
    settingsStore:settingsReducer
})
export const store = createStore(reducers,applyMiddleware(thunk))