import { useSelector } from "react-redux"
import Categories from "./pages/Categories"
import Quizz from "./Quiz/Quizz"
import Ranking from "./pages/Ranking"
import GameTypes from "./pages/GameTypes"
import Header from "./Header"

function Main() {
    const status = useSelector(store => store.gamplayStore.status)
    return (
        <main className="h-[90vh]">
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
