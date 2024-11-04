import { getData } from "../../redux/questionsReducer"
import { ready } from "../../redux/gamePlayReducer"
import { CategoryContext, topCategories, useCategory } from "../Quiz/context/CategoryContext"


function Categories() {
    return (
        <CategoryContext>
                <HeaderCatgeories/>
                <div className='grid  grid-cols-[1fr,1fr] px-1 sm:grid-cols-3 md:grid-cols-5' >
                        {topCategories?.map(e =><Category  key={e.id} Category={e} />)}
                </div>
        </CategoryContext>
    )
}

function Category({Category}) {
    const { name, icons, id }=Category
    const {difficulty,numberQuestions,dispatch}=useCategory()
    return (
        <div className="p-1 md:p-2 text-xl  shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex bg-white flex-col justify-center  cursor-pointer hover:scale-105 m-1 rounded-lg text-center"
            onClick={() => {
                dispatch(getData(id,numberQuestions,difficulty));
                dispatch(ready())
            }}
        >
            <i className={`${icons} text-second text-xl `}></i>
            <p className='text-dark  max-sm:text-base md:text-xl'> {name.includes('Entertainment:')?name.slice(14):name}</p>
        </div>
    )
}
function HeaderCatgeories() {
    return(  <div className='flex justify-between px-3'>
                <p className=" text-text text-xl md:text-2xl"> Quiz Categories</p>
                <p className='peer cursor-pointer text-lg md:text-xl text-textSecond'> view more</p>
                <MoreCategories />
    </div>
    )
}
function MoreCategories() {
    const {moreCat,numberQuestions,difficulty,dispatch}=useCategory()
    return (
        <div className="absolute shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-fit md:h-[50vh]  md:overflow-y-scroll md:scroll rounded-xl flex flex-col bg-white p-2 right-20 top-6 cursor-pointer translate-x-32 scale-0 peer-hover:scale-100 hover:scale-100 hover:translate-x-0 peer-hover:translate-x-0 transition hover:duration-300">
            {moreCat?.map(e =>
                <span className='px-2 text-text rounded-md m-1 hover:bg-light hover:scale-105' key={e.id}
                onClick={() => {
                    dispatch(getData(e.id,numberQuestions,difficulty))
                    dispatch(ready())
                }}>
                { e.name.includes('Entertainment:') ? e.name.slice(14) : e.name}
                </span>
            )}
        </div>
    )
}
export default Categories
