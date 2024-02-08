import { useSelector } from "react-redux"
import Categories from "./Categories"
import Quizz from "./Quizz"
import Ranking from "./Ranking"
import GameTypes from "./GameTypes"
import Header from "./Header"

function Main() {
    const status = useSelector(store => store.gamplayStore.status)
    return (
        <main className="h-[90vh]]">
            {status === 'stop'?
                <>
                    <Header />
                    <Ranking />
                    <GameTypes/>
                    <Categories />
                </>
                :
                 <Quizz/>
            }

        </main>
    )
}

export default Main
