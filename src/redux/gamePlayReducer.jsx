
function gamePlayReducer(state={count:0,status:'stop',score:0,answred:0,allScores:[0],wins:0}, action) {
    switch (action.type) {
        case 'stop':
            return { ...state, status:"stop"}
        case 'ready':
            return { ...state, status: 'ready',score:0,answred:0 }
        case 'playing':
            return { ...state, status: 'playing' }
        case 'finish':
            return { ...state, status: 'finish' }
        case 'correct':
            return { ...state, score: state.score + 10, answred: state.answred + 1 }
        case 'allScores':
            return { ...state, allScores: [...state.allScores, action.payload] }
        case 'win':
            return { ...state, wins: action.payload }
        case 'counter':
            return {...state,count:action.payload}
        default:
            return {...state}
    }
}

function stop() {
     return ({type:'stop'})
 }
function ready() {
     return ({type:'ready'})
 }
function playing() {
     return ({type:'playing'})
 }
function finish() {
     return ({type:'finish'})
}
function correct() {
     return ({type:'correct'})
}
function addScore(score) {
    return({type:'allScores',payload:score})
}
function win(wins) {
    return({type:'win',payload:wins})
}
function counter(number) {
    return({type:'counter',payload:number})
}

 export {gamePlayReducer,stop,ready,playing,finish,correct,addScore,win,counter}