import { useQuiz } from "../contexts/QuizContext";

const Options = ({ question }) => {
    const { answer, dispatch } = useQuiz();

    const hasAnswered = answer !== null;

    return (
        <div className="options">
            {question.options.map((option, i) =>
                <button
                    key={option}
                    disabled={hasAnswered}
                    className={`btn btn-option
                        ${i+1 === answer ? "answer" : ""}
                        ${hasAnswered ?
                            (i+1 === question.correctOption ? "right" : "wrong")
                            : ""
                        }
                    `}
                    onClick={() => dispatch({ type: 'quiz/answer', payload: i+1})}
                >{option}
                </button>
            )}
        </div>
    );
}

export default Options;