import { useDispatch, useSelector } from "react-redux"
import { finish, playing, stop,correct as incrScore, addScore, win } from "../redux/gamePlayReducer"
import { useEffect, useRef, useState } from "react"
import { useIncrLocaleStorage, useSetToLocaleStorage } from "./hooks"

function Quizz() {
    const { status, score, answred } = useSelector(store => store.gamplayStore)
    const {questions} = useSelector(store => store.questionStore)
    const settings = useSelector(store => store.settingsStore)
    const dispatch = useDispatch()

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
            const id=setInterval(() => {
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
        <section className="p-5 mx-2 md:mx-20">
            <p className=' text-textSecond text-xl' >
                <i className="fa-solid fa-arrow-left" />
                <span className='cursor-pointer' onClick={() => dispatch(stop())}> retour</span>
            </p>
            {status === 'ready' &&  <StartCount count={startCount}/>   }
            
          {  status==='playing'&&
            <>
                <ProgressBar timer={timer} index={index} score={score} number={questions.length} />
                <QuestionCard index={index} questions={questions} />
                <Skip setindex={setindex} setTimer={ setTimer} index={index} settings={settings} />
                
            </>
            }
            {status === 'finish' && <Finish score={score} answred={answred}  numberQuestions={settings.numberQuestions} />   }

        </section>
    )
}

export default Quizz


function StartCount({count}) {
    return (
        <section className="flex flex-col items-center justify-center h-[80vh]">
            <p className="text-4xl text-text ">get ready !!</p>
            <p className="text-9xl text-text mt-8 animate-ping">{count }</p>
        </section>
    )
}
function ProgressBar({timer,number,index,score}) {
    return (
        <div className='flex flex-col items-center'>
           <span className="text-center animate-ping">{timer}</span>   
            <div className="w-full bg-textSecond rounded-full h-2.5 ">
                <div className='bg-second h-2.5 rounded-full transition-[width] max-w-full duration-500' style={{ width:`${10 * timer}%`}} />
            </div>
            <div className="flex justify-between w-full mt-3">
                <p>{index+1} / {number }</p>
                <p>score : {score} / {10*number }</p>
            </div>
        </div>
    )
}
function Finish({ score, answred ,numberQuestions}) {
    const dispatch = useDispatch()

    useSetToLocaleStorage(score, 'allScores')
    useIncrLocaleStorage(1, 'gamePlays')

    useEffect(() => {
        dispatch(addScore(score))
        if (score === numberQuestions * 10) {
            localStorage.setItem('wins',Number(localStorage.getItem('wins'))+1)
            dispatch(win(Number(localStorage.getItem('wins'))))
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
        </div>
    )
}
function QuestionCard({ questions, index }) {
    const {question,correct_answer,incorrect_answers}=questions[index]
    return (
        <div className="min-h-[65vh]">
            <Question question={question} />
            <Options correct={correct_answer } incorrect={incorrect_answers} />
        </div>
    )
}
function Question({ question }) {
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
function Options({ correct, incorrect }) {
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
            <audio className="hidden" src="true.mp3" ref={trueAnswer} controls />
            <audio className="hidden" src="false.mp3" ref={wrongAnswer} controls />
   
        </>
    )
}
function Skip({ setindex, setTimer, index,settings }) {
    const dispatch =useDispatch()
    return (
        <div className="flex justify-end text-xl">
            <span onClick={() => {
                if (index < settings.numberQuestions-1) { 
                    setindex(e => e + 1)
                    setTimer(settings.timer)
                } else {
                    dispatch(finish())
                }
            }}
                className="bg-text text-white cursor-pointer hover:scale-105 p-1 px-2 rounded-md my-2">
                Next

            </span>
        </div>
    )
}