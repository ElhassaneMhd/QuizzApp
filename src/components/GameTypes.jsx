import { useDispatch } from "react-redux"
import { getBoleanQuestions, getRandomQuestions } from "../redux/questionsReducer"
import { ready } from "../redux/gamePlayReducer"

function GameTypes() {
    const  dispatch =useDispatch()
    return (
        <section className="grid grid-cols-[1fr,2fr] text-xl px-10 gap-2 justify-start mt-10 mb-5 ">
            <p className="text-textSecond mr-20 text-2xl">Take a quick random Quiz</p>
            <div>

            <button className="p-2 px-5 text-white rounded-md bg-text shadow-[0_4px_10px_rgb(0,0,0,0.5)] scale-95 hover:scale-100 transition duration-200"
                onClick={() => {
                    dispatch(getRandomQuestions())
                    dispatch(ready())
                }}>
                Multiple Choises <i className="fa-solid fa-list-check"/>
            </button>
            <button className="p-2 px-5 text-white rounded-md bg-text shadow-[0_4px_10px_rgb(0,0,0,0.5)] scale-95 hover:scale-100 transition duration-200"
                onClick={() => {
                    dispatch(getBoleanQuestions())
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
