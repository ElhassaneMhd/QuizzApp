
function questionReducer(state={},action) {
    switch (action.type) {
        case 'get':
            return { ...state, questions: [...action.payload] }
        case 'getCategories':
            return {...state,categories:[...action.payload]}
        case 'getRandomQuestions':
            return {...state,questions:[...action.payload]}
        case 'getBoleanQuestions':
            return {...state,questions:[...action.payload]}
        default:
            return state
    }
}

function getData(cat,amount=10,difficulty='') {
    return async function(dispatch){
        const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${cat}&type=multiple`)
        const data = await res.json()
        console.log(data.results)
       await dispatch({type:'get',payload:[...data.results]})
    }
}
function getRandomQuestions(amount=10,difficulty='') {
    return async function(dispatch){
        const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`)
        const data = await res.json()
        console.log(data.results)
       await dispatch({type:'get',payload:[...data.results]})
    }
}
function getBoleanQuestions(amount=10,difficulty='') {
    return async function(dispatch){
        const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=boolean`)
        const data = await res.json()
        console.log(data.results)
       await dispatch({type:'get',payload:[...data.results]})
    }
}

function getCategories() {
    return async function(dispatch){
        const res = await fetch('https://opentdb.com/api_category.php')
        const data = await res.json()
        await dispatch({type:'getCategories',payload:[...data.trivia_categories]})
    }
}


// Game play reducer



export {questionReducer,getData,getCategories,getRandomQuestions,getBoleanQuestions}

