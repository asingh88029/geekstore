export function modalAction(){
    return {
        type:"toggleModalValue"
    }
}

export function userTokenAction(data){
    return {
        type:"setUserToken",
        payload:data
    }
}
