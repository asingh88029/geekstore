const initialState = {
    modalShow:false,
    userToken:""
}

function myReducer(state=initialState,action){

    switch(action.type){

        case "toggleModalValue":{
            return {
                ...state,
                modalShow:!state.modalShow
            }
        }

        case "setUserToken":{
            return {
                ...state,
                userToken:action.payload
            }
        }

        default:{
            return state
        }

    }
}

export default myReducer