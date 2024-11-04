import { useDispatch, useSelector } from "react-redux"
import { getBoleanQuestions, getRandomQuestions } from "../../redux/questionsReducer"
import { ready } from "../../redux/gamePlayReducer"

function GameTypes() {
    const dispatch = useDispatch()
    const {difficulty,numberQuestions}=useSelector(store=>store.settingsStore)
    return (
        <section className="flex flex-col md:grid md:grid-cols-[1fr,2fr] text-lg md:text-xl p-2 md:px-10 gap-2 justify-start my-3 md:mt-10  ">
            <p className="text-textSecond text-2xl">Take a quick random Quiz</p>
            <div className=" max-md:flex justify-center">
                <button className="p-2 md:px-5 text-white rounded-md bg-text shadow-[0_4px_10px_rgb(0,0,0,0.5)] scale-95 hover:scale-100 transition duration-200"
                    onClick={() => {
                        dispatch(getRandomQuestions(numberQuestions,difficulty))
                        dispatch(ready())
                    }}>
                    Multiple Choises <i className="fa-solid fa-list-check"/>
                </button>
                <button className="p-2 md:px-5 text-white rounded-md bg-text shadow-[0_4px_10px_rgb(0,0,0,0.5)] scale-95 hover:scale-100 transition duration-200"
                    onClick={() => {
                        dispatch(getBoleanQuestions(numberQuestions,difficulty))
                        dispatch(ready())

                    }}>
                    <span>True False </span>
                    <span ><i className="fa-solid fa-check" /> <i className="fa-solid fa-xmark" /></span>
                </button>
            </div>
        </section>
    )
}

export default GameTypes
