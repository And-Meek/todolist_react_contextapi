import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { taskReducer, controlPanelReducer } from './reducers';

const reducer = combineReducers({
	taskState: taskReducer,
	controlPanelState: controlPanelReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
