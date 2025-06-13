import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartQuiz from "./StartQuiz";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import FinishQuiz from "./FinishQuiz";
import Timer from "./Timer";

const SECONDS_PER_QUESTION = 10;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch(action.type) {
    case 'dataReceived' : return { ...state, questions: action.payload, status: "ready" };
    case 'dataNotReceived': return { ...state, status: "error" };
    case 'dataFetching': return { ...state, status: "loading" };
    case 'start':
      return {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        score: 0,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION
      };
    case 'answer':
      const question = state.questions[state.index];
      const isCorrect = question.correctOption === action.payload;
      return {
        ...state,
        answer: action.payload,
        score: state.score + (isCorrect ? question.points : 0)
      };
    case 'next':
      return {
        ...state,
        index: state.index + 1,
        answer: null
      };
    case 'finish':
      return {
        ...state,
        status: "finished",
        answer: null,
        highscore: state.score > state.highscore ? state.score : state.highscore
      };
    case 'decrement':
      return {
        ...state,
        status: state.secondsRemaining == 0 ? "finished" : state.status,
        highscore: state.score > state.highscore ? state.score : state.highscore,
        secondsRemaining: state.secondsRemaining - 1
      };
    default: throw new Error("Unknown action");
  }
}

function App() {
  const [{questions, status, index, answer, score, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxScore = questions.reduce((total, current) => total + current.points, 0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        dispatch({ type: 'dataFetching' });
        const res = await fetch("http://localhost:9000/questions");
        const json = await res.json();
        dispatch({ type: 'dataReceived', payload: json });
      }
      catch(err) {
        dispatch({ type: 'dataNotReceived'});
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header/>
      <Main>
        {status === "loading" && <Loader/>}
        {status === "error" && <Error/>}
        {status === "ready" &&
          <StartQuiz
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        }
        {status === "active" &&
          <>
            <ProgressBar
              index={index}
              numQuestions={numQuestions}
              score={score}
              maxScore={maxScore}
              answer={answer}
            />
            <Question
              question={questions.at(index)}
              answer={answer}
              dispatch={dispatch}
            />
            <footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch}/>
              <NextButton
                answer={answer}
                index={index}
                numQuestions={numQuestions}
                dispatch={dispatch}
              />
            </footer>
          </>
        }
        {status === "finished" &&
          <FinishQuiz
            score={score}
            maxScore={maxScore}
            highscore={highscore}
            dispatch={dispatch}
          />
        }
      </Main>
    </div>
  );
}

export default App;