import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { setDifficulty, setNumberQuestions, setTimer } from "../redux/settingsReducer"

function Settings() {

    const { timer, numberQuestions, difficulty } = useSelector(store => store.settingsStore)
    
    const navigate = useNavigate()
    const dispatch =useDispatch()
    return (
        <section className="m-10 px-10">
            <p className="text-textSecond mb-5 text-xl">
                <i className="fa-solid fa-arrow-left" />
                <span className="cursor-pointer mx-1" onClick={()=>navigate(-1)}>Retour</span>
            </p>
            <p className='text-2xl text-text'>Settings <i className="fa-solid fa-gears"/></p>
            <div className=" grid grid-cols-[1fr,1fr] grid-rows-3 gap-3 p-3  items-center rounded-md bg-white shadow-sm shadow-black">
                <span className="text-dark text-xl">timer <i className="fa-solid fa-stopwatch text-second" /></span>
                    <div className="flex p-1 gap-1 text-text bg-slate-200 rounded-md w-fit shadow shadow-black">
                        <span className={`${timer==10?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setTimer(10))}>10s</span> 
                        <span className={`${timer==15?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setTimer(15))}>15s</span> 
                        <span className={`${timer==20?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setTimer(20))}>20s</span> 
                        <span className={`${timer==30?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setTimer(30))}>30s</span> 
                    </div>
                <span  className="text-dark text-xl">Number Question <i className="fa-solid fa-clipboard-list text-second" /></span>
                  <div className="flex p-1 gap-1 text-text bg-slate-200 rounded-md w-fit shadow shadow-black">
                        <span className={`${numberQuestions==10?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setNumberQuestions(10))}>10</span> 
                        <span className={`${numberQuestions==20?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setNumberQuestions(20))}>20</span> 
                        <span className={`${numberQuestions==30?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setNumberQuestions(30))}>30</span> 
                    </div>
                <span className="text-dark text-xl">defficulte <i className="fa-solid fa-arrow-trend-up text-second"/></span>
                 <div className="flex p-1 gap-1 text-text bg-slate-200 rounded-md w-fit shadow shadow-black">
                        <span className={`${difficulty==''?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setDifficulty(''))}>Any</span> 
                        <span className={`${difficulty=='easy'?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setDifficulty('easy'))}>Easy</span> 
                        <span className={`${difficulty=='medium'?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setDifficulty('medium'))}>Medium</span> 
                        <span className={`${difficulty=='hard'?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setDifficulty('hard'))}>Hard</span> 
                    </div>
            </div>
        </section>
    )
}

export default Settings
