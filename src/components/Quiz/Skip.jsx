import { useDispatch } from "react-redux"
import { finish } from "../../redux/gamePlayReducer"

export function Skip({ setindex, setTimer, index,settings }) {
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