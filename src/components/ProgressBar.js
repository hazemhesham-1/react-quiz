import { useQuiz } from "../contexts/QuizContext";

const ProgressBar = () => {
    const { index, numQuestions, score, maxScore, answer } = useQuiz();

    const hasAnswered = answer !== null;

    return (
        <header className="progress">
            <progress
                value={hasAnswered? index + 1 : index}
                max={numQuestions}
            >
            </progress>
            <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
            <p><strong>{score}</strong> / {maxScore} points</p>
        </header>
    );
}

export default ProgressBar;