import { createContext, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useStoredSettings } from "../../hooks"

const settingsProvider = createContext()
function SettingsContext({children}) {
    const { timer, numberQuestions, difficulty ,sound} = useSelector(store => store.settingsStore)
    const dispatch = useDispatch()
        useStoredSettings('timer',timer)

    return (
        <settingsProvider.Provider value={{timer,numberQuestions,difficulty,dispatch,sound}}>

          <div className="max-w-fit rounded-md bg-white shadow-sm shadow-black p-3 px-5 md:px-10 flex flex-col gap-1">
                <p className='text-text text-xl '>Questions Settings :</p>
                <div className=" grid grid-cols-[1fr] md:grid-cols-[1fr,1fr]  grid-rows-3 mb-3  items-center ">
                {children}
                </div>
            </div>
            </settingsProvider.Provider>
    )
}
function useSettings() {
    const context = useContext(settingsProvider)
    return context
}
export {useSettings, SettingsContext}
