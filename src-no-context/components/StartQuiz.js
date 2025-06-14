const StartQuiz = ({ numQuestions, dispatch }) => {
    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{numQuestions} questions to test your React knowledge</h3>
            <button
                className="btn btn-primary"
                onClick={() => dispatch({type: "start"})}
            >Let's start</button>
        </div>
    );
}

export default StartQuiz;