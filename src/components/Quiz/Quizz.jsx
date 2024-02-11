import { useDispatch, useSelector } from "react-redux"
import { finish, playing, stop } from "../../redux/gamePlayReducer"
import { useEffect, useState } from "react"
import { Finish } from "./Finish"
import { ProgressBar } from "./ProgressBar"
import { QuestionCard } from "./QuestionCard"
import { Skip } from "./Skip"
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
