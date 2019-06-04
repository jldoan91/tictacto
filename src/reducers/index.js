import { combineReducers } from "redux";

import DataReducer from './dataReducer';
import GuiReducer from './guiReducer';


// console.log(DataReducer)
var reducers = combineReducers({ 
    DataReducer,
    GuiReducer
});

export default (state, action) => {
    // if(action.type == 'RESET__REDUCERS'){
    //     window.sessionStorage.clear();
    //     state = undefined;
    // }

    return reducers(state, action)
}