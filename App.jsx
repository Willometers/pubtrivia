import { useState, useEffect } from 'react';
import { getQuestion } from './utils/questionsAPI';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      const loadedQuestions = await getQuestion();
      setQuestions(loadedQuestions);
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    if (questions) {
      const allAnswers = questions.reduce((accumulator, question) => {
        const { id, correctAnswer, incorrectAnswers } = question;
        const shuffledAnswers = shuffleArray([correctAnswer, ...incorrectAnswers]);
        return [...accumulator, { id, question: question.question, correctAnswer, answers: shuffledAnswers }];
      }, []);
      setAnswers(allAnswers);
    }
  }, [questions]);

  const handleAnswerClick = (questionId, selectedAnswer) => {
    const correctAnswer = answers.find((q) => q.id === questionId).correctAnswer;
    const isCorrect = correctAnswer === selectedAnswer;

    setSelectedAnswer(selectedAnswer);
    setIsCorrect(isCorrect);

    console.log(`Answer for question ${questionId} is ${isCorrect ? 'correct' : 'incorrect'}`);
  };

  return (
    <div>
      <h1>Quiz App</h1>

      {answers.map(({ id, question, answers }) => (
        <Card key={id} style={{ width: '35rem' }}>
          <h2>{question}</h2>
          {answers.map((a, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerClick(id, a)}
              style={{
                backgroundColor:
                  selectedAnswer === a && isCorrect !== null ? (isCorrect ? 'green' : 'red') : '',
              }}
            >
              {a}
            </Button>
          ))}
        </Card>
      ))}
    </div>
  );
}

export default App;
