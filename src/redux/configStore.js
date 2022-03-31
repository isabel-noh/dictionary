//store 생성하기

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import dictionary from "./modules/dictionary";

//스토어는 리듀서를 뭉친 걸 가지고 만듦
const middleWares = [thunk];
const enhancer = applyMiddleware(...middleWares);

const rootReducer = combineReducers({dictionary});   //여러개의 reducer을 합칠 때에는 combineReducers({bucket1, bucket2 ,... })

const store = createStore(rootReducer, enhancer);

export default store;