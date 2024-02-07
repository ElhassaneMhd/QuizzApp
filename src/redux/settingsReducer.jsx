function settingsReducer(state = { timer: 15, numberQuestions: 10, difficulty: '' }, action) {
    switch (action.type) {
        case 'setTimer':
            return {...state,timer:action.payload}
        case 'setNumberQuestions':
            return {...state,numberQuestions:action.payload}
        case 'setDifficulty':
            return { ...state, difficulty: action.payload }
        default:
            return state
    }

}

function setTimer(timer) {
    return ({ type: 'setTimer',payload:timer})
}
function setDifficulty(difficulty) {
    return ({ type: 'setDifficulty',payload:difficulty})
}
function setNumberQuestions(number) {
    return ({type:"setNumberQuestions",payload:number})
}


export  {settingsReducer,setNumberQuestions,setTimer,setDifficulty}
