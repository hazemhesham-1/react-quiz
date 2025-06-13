import { useEffect } from "react";

const Timer = ({ secondsRemaining, dispatch }) => {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: 'decrement' });
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