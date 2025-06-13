const NextButton = ({ answer, index, numQuestions, dispatch }) => {
    if(answer === null) return;
    const isFinished = numQuestions === (index + 1);

    return (
        <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: isFinished ? 'finish' : 'next' })}
        >{isFinished ? "Finish" : "Next"}</button>
    );
}

export default NextButton;