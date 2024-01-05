import { Button } from "react-bootstrap";

const Question = (option,onClick, selectedAnswer, correctAnswer) => {

    const AnswerOption = ({ option, onClick, selectedAnswer, correctAnswer }) => (
        <Button className="buffered-button"
          onClick={() => onClick(option)}
          style={{
            backgroundColor:
              selectedAnswer === option && selectedAnswer === correctAnswer ? 'green' : selectedAnswer === option ? 'red' : '',
          }}
        > 
          {option}
        </Button>
      );

    return (
        <div>
            <AnswerOption>
            {correctAnswer} asdfs
            </AnswerOption>
        </div>
    )
}

export default Question