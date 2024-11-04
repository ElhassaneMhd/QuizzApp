import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { finish, playing } from "../../../redux/gamePlayReducer"

const quizContext=createContext()
function QuizContext({ children }) {
    const dispatch = useDispatch()
    const { status, score, answred } = useSelector(store => store.gamplayStore)
    const {questions} = useSelector(store => store.questionStore)
    const settings = useSelector(store => store.settingsStore)
    const [startCount, setStartCount] = useState(3)
    const [timer,setTimer]=useState(settings.timer)
    const [index, setindex] = useState(0)
    useEffect(() => {      
        const id = setInterval(() => {  
            if (status === 'ready') {                
                if (startCount > 1) setStartCount(e => e - 1)
                else dispatch(playing())
            }
        }, 1000)
        return ()=>clearInterval(id)
    }, [dispatch,startCount,status])
    useEffect(() =>{
        if (status==='playing'){
            const id = setInterval(() => {
                if (timer > 0) setTimer(e => e - 1)
                else if(index<settings.numberQuestions-1) {
                    setTimer(settings.timer)
                    setindex(e=>e+1)
                }
                else dispatch(finish())
            }, 1000)  
            return ()=>clearInterval(id)
        }    
    }, [timer, dispatch, status,index,settings])

    return (
        <quizContext.Provider value={{
            count: startCount,
            number: questions?.length,
            numberQuestions:settings.numberQuestions,
            timer, score, index, answred, setindex, setTimer,settings,questions
        }}>
            <section className="p-5 mx-2 md:mx-20">
                {children}
            </section>
        </quizContext.Provider>
    )
}
function useQuiz() {
    const context = useContext(quizContext)
    return context
}

export { QuizContext,useQuiz}
