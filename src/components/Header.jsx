import { Link } from "react-router-dom"
function Header() {
    return (
        <header className="flex justify-between items-center  py-2 mx-2  md:mx-10 ">
            <div className="text-2xl">
                <p className=" text-text">Start<span className='text-second'>Quizz</span> </p>
                <span className="text-textSecond text-lg">let&apos;s <span className='text-second'>play</span> the <span className='text-text'>quiz</span></span>
            </div>
            <div className="flex items-center">
                <span className=' border cursor-pointer text-xl p-1 border-text text-text px-2 rounded-full '>
                     <i className="fa-solid  fa-user hover:scale-105" />
                </span>
                
                <span className='group relative px-2 cursor-pointer text-text '>
                        <Link  to={'/settings'} className=' text-text flex items-center gap-1 rounded-full m-[1px] hover:bg-light hover:scale-105' ><i className="text-2xl fa-solid fa-gear"></i></Link>

                    {/* <i className="text-2xl fa-solid fa-bars"></i>
                      <div className="absolute shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl flex flex-col bg-white p-1 right-0 top-5 cursor-pointer translate-x-16 scale-0 group-hover:scale-100 hover:scale-100 hover:translate-x-0 group-hover:translate-x-0 transition hover:duration-300">
                    </div> */}
                </span>
            </div>
        </header>
    )
}

export default Header
