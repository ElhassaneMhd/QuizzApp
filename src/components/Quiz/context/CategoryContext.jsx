import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/questionsReducer";
export const topCategories =
    [
        { id: 9, icons: 'fa-solid fa-brain', name: "General Knowledge"},
        { id: 10, icons: 'fa-solid fa-book', name: " Books" },
        { id: 11, icons: 'fa-solid fa-film', name: " Film" },
        { id: 12, icons: 'fa-solid fa-music', name: " Music" },
        { id: 15, icons: 'fa-solid fa-gamepad', name: " Video Games" },
        { id: 17, icons: 'fa-solid fa-microscope', name: "Science & Nature" },
        { id: 18, icons: 'fa-solid fa-laptop-code', name: "Science: Computers" },
        { id: 27, icons: 'fa-solid fa-paw', name: "Animals" },
        { id: 28, icons: 'fa-solid fa-car', name: "Vehicles" },
        { id: 29, icons: 'fa-solid fa-face-laugh-squint', name: " Comics" },
     
    ]

const CategoryProvider = createContext();
function CategoryContext({children}) {
    const Allcategories = useSelector(cat => cat.questionStore.categories)
    const {difficulty,numberQuestions}=useSelector(store=>store.settingsStore)
    const dispatch =useDispatch()
    const moreCat = Allcategories?.filter(e=>!topCategories.map(e=>e.id).includes(e.id))
    useEffect(() => {
       !Allcategories&&dispatch(getCategories())
    },[dispatch,Allcategories])
    return (
        <CategoryProvider.Provider value={{ difficulty, moreCat, numberQuestions, dispatch }}>
                <section className='max-sm:h-[58vh] h-[55vh] px-2 md:px-10 md:relative '>
                    {children}
                </section>
        </CategoryProvider.Provider >
    )
}
function useCategory() {
    const context = useContext(CategoryProvider)
    return context
}

export {useCategory, CategoryContext}
