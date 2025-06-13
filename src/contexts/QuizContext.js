import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECONDS_PER_QUESTION = 10;

function reducer(state, action) {
  switch (action.type) {
    case "data/success":
      return { ...state, questions: action.payload, status: "ready" };
    case "data/failed":
      return { ...state, status: "error" };
    case "loading":
      return { ...state, status: "loading" };
    case "quiz/start":
      return {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        score: 0,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "quiz/answer":
      const question = state.questions[state.index];
      const isCorrect = question.correctOption === action.payload;
      return {
        ...state,
        answer: action.payload,
        score: state.score + (isCorrect ? question.points : 0),
      };
    case "quiz/next":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "quiz/finish":
      return {
        ...state,
        status: "finished",
        answer: null,
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
      };
    case "timer/decrement":
      return {
        ...state,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
        secondsRemaining: state.secondsRemaining - 1,
      };
    default:
      throw new Error("Unknown action");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, score, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxScore = questions.reduce(
    (total, current) => total + current.points,
    0
  );

  useEffect(() => {
    async function fetchQuestions() {
      const BASE_URL = window.location.hostname;

      try {
        dispatch({ type: "loading" });

        const res = await fetch(`http://${BASE_URL}:9000/questions`);
        const json = await res.json();

        dispatch({ type: "data/success", payload: json });
      } catch (err) {
        dispatch({ type: "data/failed" });
      }
    }

    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        score,
        highscore,
        secondsRemaining,
        numQuestions,
        maxScore,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("QuizContext was used outside of QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
