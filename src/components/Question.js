import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

const Question = () => {
    const { questions, index } = useQuiz();

    return (
        <div>
            <h4>{questions[index].question}</h4>
            <Options question={questions[index]}/>
        </div>
    );
}

export default Question;