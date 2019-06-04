import produce from "immer"

const initialState = {
    number: '123'
}

export default (state = initialState, action) => {
    produce(state, draft => {
        switch(action.type){
            default:
                draft = draft;
                break;
        }
    });

    return state;
}