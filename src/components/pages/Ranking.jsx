import { useEffect } from "react"
import { counter, win } from "../../redux/gamePlayReducer"
import { useDispatch } from "react-redux"

function Ranking() {
    const hightScore = Math.max(...JSON.parse(localStorage.getItem('allScores')) || [0])
    const count = localStorage.getItem('gamePlays')||0
    const wins = localStorage.getItem('wins') || 0
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(win(wins))
        dispatch(counter(count))
    },[dispatch,wins,count])
    return (
        <>
        <section className="m-2 md:mx-10 md:mb-5 shadow-[0_9px_20px_rgb(0,0,0,0.5)] bg-text text-white p-3 md:p-5 flex justify-center rounded-md">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-ranking-star text-4xl text-orange-400"></i>
                    <p className="flex flex-col items-center">
                        <span>
                            Hight Score
                        </span>
                        <span>
                            {hightScore}
                        </span>
                    </p>
                </div>
                <div className=" border-x-2 flex items-center gap-2 border-white px-3 mx-3"> 
                    <i className="fa-solid fa-trophy text-4xl text-yellow-500 " />
                    <p className="flex flex-col items-center">
                        <span>
                            Win
                        </span>
                        <span>
                            {wins}
                        </span>
                    </p>
                </div>
                <div className=" flex gap-2 items-center "> 
                    <i className="fa-solid h-min fa-list-ol text-4xl text-light"/>
                    <p className="flex flex-col items-center">
                        <span>
                           Game Play
                        </span>
                        <span>
                            {count}
                        </span>
                    </p>
                </div>            
            </section>
        </>
    )
}
export default Ranking
