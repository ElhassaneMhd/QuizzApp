import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { correct as incrScore } from "../../redux/gamePlayReducer"
import { useQuiz } from "./context/QuizContext";

const QuestionContext = createContext();

export function QuestionCard() {
    const { questions, index }=useQuiz()
    const { question, correct_answer, incorrect_answers } = questions[index]
    
    return (
        <div className="min-h-[65vh]">
            <QuestionContext.Provider value={{question,correct:correct_answer,incorrect:incorrect_answers}}>
                <Question  />
                <Options />
            </QuestionContext.Provider>
        </div>
    )
}
function Question() {
    const { question }=useContext(QuestionContext)
      function decodeHtmlEntities(encodedString) {
        const tempElement = document.createElement('p');
        tempElement.innerHTML = encodedString;
        return tempElement.textContent || tempElement.innerText;
    }
    return (
        <div className='p-2 my-4'>
            <p className="text-3xl text-dark  rounded-md text-center ">{question && decodeHtmlEntities(question)}</p>   
        </div>
    )
}
function Options() {
    const { correct,incorrect }=useContext(QuestionContext)
    const {sound}=useSelector(store=>store.settingsStore)
    const trueAnswer = useRef(null)
    const wrongAnswer = useRef(null)
    const dispatch = useDispatch()
    const options = [...incorrect, correct].sort()
    const [answer, setAnswer] = useState({})
    const [isCorrect, setisCorrect] = useState()
    const [isAnswred, setisAnswred] = useState()
    
    function decodeHtmlEntities(encodedString) {
        const tempElement = document.createElement('p');
        tempElement.innerHTML = encodedString;
        return tempElement.textContent || tempElement.innerText;
    }

    useEffect(() => {
        setAnswer({}) 
        setisCorrect()
        setisAnswred()
    },[correct,incorrect])

    useEffect(() => {
        if (answer.value===correct) {
            setisCorrect(true)
        } else {
            setisCorrect(false)
        }
    }, [answer, dispatch, correct])
    
    return (
        <>
            { options.map((e, i) =>
                <div key={i}
                    className={`
                    ${  answer.id === i && isCorrect ? 'bg-green-500'
                        : answer.id === i && !isCorrect ? 'bg-red-500 '
                        : answer.value && options.indexOf(correct) === i ? 'bg-green-500  animate-pulse'
                        : ' bg-white'
                    }  flex my-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${!answer.value && 'hover:bg-second hover:text-white transition duration-300'}
                             text-dark rounded-md w-full `}>
                    <input 
                        className="w-full cursor-pointer p-3 h-full text-2xl"
                        type="button" value={decodeHtmlEntities(e)}
                        onClick={(e) => {
                            !answer.value && setAnswer({ id: i, value: e.target.value })
                            sound&&(!answer.value && e.target.value === correct ? trueAnswer.current.play() : wrongAnswer.current.play())
                            !isAnswred && e.target.value === correct && options.indexOf(correct) === i && dispatch(incrScore())
                            setisAnswred(true)
                            }
                        }
                    />
                     <p className="p-3 font-bold text-2xl">{answer.id === i && isCorrect ? <i className="fa-solid fa-check"/> :answer.id === i && !isCorrect ?<i className="fa-regular fa-circle-xmark"/>:answer.value && options.indexOf(correct)===i ? <i className="fa-solid fa-check"/>:''}</p>
              </div>
            )}
            <audio className="hidden" src="sounds/correctAnswer.mp3" ref={trueAnswer} controls />
            <audio className="hidden" src="sounds/incorrectAnswer.mp3" ref={wrongAnswer} controls />
        </>
    )
}
