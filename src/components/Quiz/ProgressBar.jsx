import { useQuiz } from "./context/QuizContext"

export function ProgressBar() {
    const { timer, number, index, score } = useQuiz();
    return (
        <div className='flex flex-col items-center'>
           <span className="text-center animate-ping">{timer}</span>   
            <div className="w-full bg-textSecond rounded-full h-2.5 ">
                <div className='bg-second h-2.5 rounded-full transition-[width] max-w-full duration-500' style={{ width:`${10 * timer}%`}} />
            </div>
            <div className="flex justify-between w-full mt-3">
                <p>{index+1} / {number }</p>
                <p>score : {score} / {10*number }</p>
            </div>
        </div>
    )
}