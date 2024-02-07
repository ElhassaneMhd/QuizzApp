import { useSelector } from "react-redux"
import Categories from "./Categories"
import Quizz from "./Quizz"
import Ranking from "./Ranking"
import GameTypes from "./GameTypes"

function Main() {
    const status = useSelector(store => store.gamplayStore.status)

    return (
        <main>
            {status === 'stop'?
                <>
                    <Ranking />
                    <GameTypes/>
                    <Categories />
                </>
                :
                <>
                    <Quizz/>
                </>
            }

        </main>
    )
}

export default Main
