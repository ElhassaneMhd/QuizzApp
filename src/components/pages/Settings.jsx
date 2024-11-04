import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { setDifficulty, setNumberQuestions, setTimer ,setSound} from "../../redux/settingsReducer"
import { SettingsContext, useSettings } from "../Quiz/context/SettingsContext"
function Settings() {


    return (
        <section className="mx-5 sm:mx-10 xl:mx-14 mt-0 p-1 flex flex-col items-center md:px-10 h-[90vh]">  
             <RetourButton/>
            <p className='text-2xl text-text m-3'>Settings <i className="fa-solid fa-gears" /></p>
            <SettingsContext>
                    <SettingProperty name={'Timer'} icon={'stopwatch'} />
                    <TimerSettings/>
                    <SettingProperty name={'Number Questions'} icon={'clipboard-list'}/>
                    <NumberQSettings/>
                    <SettingProperty name={'Defficulty'} icon={'arrow-trend-up'}/>
                    <DifficultySettings/>
                    <Sound />
            </SettingsContext>
        </section>
    )
}

export default Settings

function Timer({ number }) {
    const {timer,dispatch}=useSettings()
    return (
            <span className={`${timer==number?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setTimer(number))}>{number}s</span> 
    )
}
function NumberQ({ number }) {
    const {numberQuestions,dispatch}=useSettings()
    return (
        <span className={`${numberQuestions==number?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setNumberQuestions(number))}>{number}</span> 
    )
}
function Difficulty({ difName }) {
    const {difficulty,dispatch}=useSettings()
    return (
        <span className={`${difficulty==difName?"bg-text text-white":"border border-text"} cursor-pointer hover:scale-105 px-3 rounded-md`}  onClick={() => dispatch(setDifficulty(difName))}>{difName===''?'any':difName}</span> 
        )
}
function Sound() {
    const {sound}=useSettings()
    const dispatch =useDispatch()
    return (
        <>
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
        </>
    )
}

function SettingProperty({name,icon}) {
    return (
        <span className="text-dark underline my-2 md:my-3"> {name} <i className={`fa-solid fa-${icon} text-second`} /></span>
    )
}
function ContainerSettings({ children }) {
    return (
        <div className="flex p-1 gap-1 text-text bg-slate-200 rounded-md w-fit shadow shadow-black">
            {children}
        </div>
    )
}
function TimerSettings() {
    return (
        <ContainerSettings>
            <Timer number={10}/>
            <Timer number={15}/>
            <Timer number={20}/>
            <Timer number={30}/>
        </ContainerSettings>
    )
}
function NumberQSettings() {
    return (
        <ContainerSettings>
            <NumberQ  number={10} />
            <NumberQ  number={20} />
            <NumberQ  number={30} />
        </ContainerSettings>
    )
}
function DifficultySettings() {
    return (
        <ContainerSettings>
            <Difficulty  difName={''}/>
            <Difficulty  difName={'easy'}/>
            <Difficulty  difName={'medium'}/>
            <Difficulty  difName={'hard'}/>
        </ContainerSettings>)
}
function RetourButton(){
    const navigate = useNavigate() 
    return (
        <p className="text-textSecond mb-5 w-full text-xl">
                <i className="fa-solid fa-arrow-left" />
                <span className="cursor-pointer mx-1" onClick={()=>navigate(-1)}>Retour</span>
            </p>
        
        )
}