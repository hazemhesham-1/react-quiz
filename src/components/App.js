import { useQuiz } from "../contexts/QuizContext";
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

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartQuiz />}
        {status === "active" && (
          <>
            <ProgressBar />
            <Question />
            <footer>
              <Timer />
              <NextButton />
            </footer>
          </>
        )}
        {status === "finished" && <FinishQuiz />}
      </Main>
    </div>
  );
}

export default App;
