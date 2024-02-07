import { useSelector } from "react-redux"

function Ranking() {
    const { allScores,count ,wins} = useSelector(store => store.gamplayStore)
    
    return (
        <>
        <p className="text-text text-2xl ms-10 mt-2">Ranking</p>
        <section className=" mx-10 mb-5 shadow-[0_9px_20px_rgb(0,0,0,0.5)] bg-text text-white p-5 flex justify-center rounded-md">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-ranking-star text-4xl text-orange-400"></i>
                    <p className="flex flex-col items-center">
                        <span>
                            Hight Score
                        </span>
                        <span>
                            {allScores.sort().reverse()[0]}
                        </span>
                    </p>
                </div>
                <div className=" border-x-2 flex gap-2 border-white px-3 mx-3"> 
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
                <div className=" flex gap-2 px-3 mx-3"> 
                    <i className="fa-solid fa-list-ol text-4xl text-light"/>
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
