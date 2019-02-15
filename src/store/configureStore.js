import { createStore, combineReducers, compose } from 'redux';

import {placesReducer} from './reducers/places';
import {authReducer} from './reducers/auth';

const rootReducer = combineReducers({
    places: placesReducer,
    auth: authReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export const configureStore = () => {
    return createStore(rootReducer, composeEnhancers());
};
