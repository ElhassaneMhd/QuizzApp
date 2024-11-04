import { useDispatch } from "react-redux"
import { useIncrLocaleStorage, useSetToLocaleStorage } from "../hooks"
import {  useEffect, useRef, useState } from "react"
import { addScore, win } from "../../redux/gamePlayReducer"
import {  useQuiz } from "./context/QuizContext"

export function Finish() {
    const { score, answred, numberQuestions }=useQuiz()
    const dispatch = useDispatch()
    const [isWinner,setIsWinner]=useState()

    useSetToLocaleStorage(score, 'allScores')
    useIncrLocaleStorage(1, 'gamePlays')

    useEffect(() => {
        dispatch(addScore(score))
        if (score === numberQuestions * 10) {
            setIsWinner(true)
        }
        // eslint-disable-next-line
    },[])
    return (
        <div className="flex flex-col text-2xl items-center justify-center min-h-[85vh]">
            <p>Quiz Finished</p>
            <div className="grid grid-cols-2">
                <span> score  </span><span>: {score}%</span>
                <span> correct question</span><span>  : {answred}</span>
                <span> incorrect question</span><span> : {numberQuestions - answred}</span>
            </div>
            {isWinner&&<Win setIsWinner={setIsWinner}/>}
        </div>
    )
}

function Win({ setIsWinner }) {
    const winSound = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        winSound.current.play()
        localStorage.setItem('wins', Number(localStorage.getItem('wins')) + 1)
        dispatch(win(Number(localStorage.getItem('wins'))))

    },[dispatch])
    return (
        <div className='absolute w-full h-full flex justify-center items-center backdrop-blur-md'>
            <span onClick={()=>setIsWinner()} className=' self-start'>X</span>
            <p>good job your are winner</p>
            <audio className='hidden' ref={winSound} src="sounds/win.mp3" controls/>
        </div>
    )

}