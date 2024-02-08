import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { setDifficulty, setNumberQuestions, setTimer ,setSound} from "../redux/settingsReducer"

function Settings() {
    const { timer, numberQuestions, difficulty ,sound} = useSelector(store => store.settingsStore)
    const navigate = useNavigate()
    return (
        <section className="mx-5 sm:mx-10 xl:mx-14 mt-0 p-1 flex flex-col items-center md:px-10 h-[90vh]">  
             <p className="text-textSecond mb-5 w-full text-xl">
                <i className="fa-solid fa-arrow-left" />
                <span className="cursor-pointer mx-1" onClick={()=>navigate(-1)}>Retour</span>
            </p>
            <p className='text-2xl text-text m-3'>Settings <i className="fa-solid fa-gears" /></p>
            <div className="max-w-fit rounded-md bg-white shadow-sm shadow-black p-3 px-5 md:px-10 flex flex-col gap-1">
                <p className='text-text text-xl '>Questions Settings :</p>
                <div className=" grid grid-cols-[1fr] md:grid-cols-[1fr,1fr]  grid-rows-3 mb-3  items-center ">
                    <SettingProperty name={'Timer'} icon={'stopwatch'}/>
                    <ContainerSettings>
                        <Timer timer={timer} number={10}/>
                        <Timer timer={timer} number={15}/>
                        <Timer timer={timer} number={20}/>
                        <Timer timer={timer} number={30}/>
                    </ContainerSettings>
                    <SettingProperty name={'Number Questions'} icon={'clipboard-list'}/>
                    <ContainerSettings>
                        <NumberQ numberQuestions={numberQuestions} number={10} />
                        <NumberQ numberQuestions={numberQuestions} number={20} />
                        <NumberQ numberQuestions={numberQuestions} number={30} />
                    </ContainerSettings>
                    <SettingProperty name={'Defficulty'} icon={'arrow-trend-up'}/>
                    <ContainerSettings>
                        <Difficulty difficulty={ difficulty}  difName={''}/>
                        <Difficulty difficulty={ difficulty}  difName={'easy'}/>
                        <Difficulty difficulty={ difficulty}  difName={'medium'}/>
                        <Difficulty difficulty={ difficulty}  difName={'hard'}/>
                    </ContainerSettings>
                </div>
                <p className='text-text text-xl'>Sound Settings :</p>
                <Sound sound={sound}/>
            </div>

             
        </section>
    )
}

export default Settings

function Timer({ timer ,number}) {
    const dispatch = useDispatch()
    return (
            <span className={`${timer==number?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setTimer(number))}>{number}s</span> 
    )
}
function NumberQ({ numberQuestions ,number}) {
    const dispatch = useDispatch()
    return (
        <span className={`${numberQuestions==number?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setNumberQuestions(number))}>{number}s</span> 
        )
}
function Difficulty({ difficulty ,difName}) {
    const dispatch = useDispatch()
    return (
        <span className={`${difficulty==difName?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setDifficulty(difName))}>{difName===''?'any':difName}</span> 
        )
}
function Sound({ sound }) {
        const dispatch =useDispatch()
    return (
        <div className='flex justify-between items-center pe-5'>
            <SettingProperty name={'Sound'} icon={'volume-high'}/>
            <div className="relative flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={sound} onChange={()=>true}/>
                <div onClick={() => sound ? dispatch(setSound(false)):dispatch(setSound(true))}
                    className="group peer ring-0 bg-slate-200  rounded-full outline-none duration-300 after:duration-300 w-20 h-8  shadow-sm shadow-black peer-checked:bg-text  peer-focus:outline-none  after:content-[''] after:shadow-sm after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-9 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-9 peer-hover:after:scale-95">
                  <div className="absolute  top-1 left-10 w-8 h-8">
                      <i className="fa-solid  mx-2 fa-volume-xmark"/>                      
                  </div>
                  <div className="absolute top-1 left-0  w-8 h-8" >
                      <i className="fa-solid  mx-2  text-slate-100 fa-volume-high"/>                      
                  </div>
                </div>
            </div>
        </div>

    )
}
function SettingProperty({name,icon}) {
    return (
        <span className="text-dark underline my-1"> {name} <i className={`fa-solid fa-${icon} text-second`} /></span>

    )
}
function ContainerSettings({ children }) {
    return (
        <div className="flex p-1 gap-1 text-text bg-slate-200 rounded-md w-fit shadow shadow-black">

            {children}
        </div>
    )
}