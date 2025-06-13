import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

const Timer = () => {
    const { secondsRemaining, dispatch } = useQuiz();
    
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: 'timer/decrement' });
        }, 1000);

        return () => clearInterval(timer)
    }, [dispatch]);

    return (
        <div className={`timer ${secondsRemaining <= 10? 'alert' : ''}`}>
            {minutes < 10 && "0" }{minutes}:
            {seconds < 10 && "0" }{seconds}
        </div>
    );
}

export default Timer;