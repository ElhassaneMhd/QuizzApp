import { useDispatch, useSelector } from "react-redux"
import { stop } from "../../redux/gamePlayReducer"
import { Finish } from "./Finish"
import { ProgressBar } from "./ProgressBar"
import { QuestionCard } from "./QuestionCard"
import { Skip } from "./Skip"
import {QuizContext,useQuiz } from "./context/QuizContext"
function Quizz() {
    const { status } = useSelector(store => store.gamplayStore)
    return (
        <QuizContext>
                <RetourButton/>
                {status === 'ready' &&  <StartCount />   }
                {status==='playing'&& <QuizCard/>}
                {status === 'finish' && <Finish />   }
        </QuizContext>

    )
}

export default Quizz

function QuizCard() {
    return (
        <>
            <ProgressBar  />
            <QuestionCard  />
            <Skip />        
        </>
    )
}

function StartCount() {
    const { count } = useQuiz()
    return (
        <section className="flex flex-col items-center justify-center h-[80vh]">
            <p className="text-4xl text-text ">get ready !!</p>
            <p className="text-9xl text-text mt-8 animate-ping">{count }</p>
        </section>
    )
}
function RetourButton() {
    const dispatch = useDispatch()
    return (
        <p className=' text-textSecond text-xl' >
            <i className="fa-solid fa-arrow-left" />
            <span className='cursor-pointer'
                onClick={() => dispatch(stop())}> retour
            </span>
        </p>
    )
}