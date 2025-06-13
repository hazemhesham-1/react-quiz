import { useQuiz } from "../contexts/QuizContext";

const NextButton = () => {
    const { answer, index, numQuestions, dispatch } = useQuiz();

    if(answer === null) return;
    const isFinished = numQuestions === (index + 1);

    return (
        <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: isFinished ? 'quiz/finish' : 'quiz/next' })}
        >{isFinished ? "Finish" : "Next"}</button>
    );
}

export default NextButton;