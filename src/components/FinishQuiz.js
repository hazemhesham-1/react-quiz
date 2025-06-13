import { useQuiz } from "../contexts/QuizContext";

const FinishQuiz = () => {
    const { score, maxScore, highscore, dispatch } = useQuiz();

    const percent = (score / maxScore) * 100;
    
    let emoji = "🥇";
    if(percent >= 80 && percent < 100) emoji = "🎉";
    if(percent >= 50 && percent < 80) emoji = "👍";
    if(percent > 0 && percent < 50) emoji = "🤔";
    if(percent === 0) emoji = "🤦‍♂️";

    return (
        <>
            <p className="result">
                <span>{emoji}</span>
                <span>You scored <strong>{score}</strong> out of {maxScore} ({Math.round(percent)}%)</span>
            </p>
            <p>(Highscore: {highscore} points)</p>
            <footer>
                <button
                    className="btn btn-primary"
                    onClick={() => dispatch({ type: 'quiz/start' })}
                >Restart Quiz</button>
            </footer>
        </>
    );
}

export default FinishQuiz;