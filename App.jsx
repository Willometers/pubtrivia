import React, { useState, useEffect } from 'react';
import { getQuestion } from './utils/questionsAPI';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Utility function to shuffle an array in-place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Component for rendering answer options
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

// Component for rendering a question card
const QuestionCard = ({ id, question, answers, correctAnswer, handleAnswerClick, selectedAnswer }) => (
  <Card key={id} style={{ width: '35rem' }} class="container-fluid" className="buffered-card">
    <Card.Body>{question}</Card.Body>
    {answers.map((option, index) => (
      // renders answers as buttons via AnswerOption 
      <AnswerOption  
        key={index}
        option={option}
        onClick={handleAnswerClick}
        selectedAnswer={selectedAnswer}
        correctAnswer={correctAnswer}
      />
    ))}
  </Card>
);

// Main App component
function App() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // console.log('q', questions)

  // Fetch questions and shuffle answer options on component mount
  useEffect(() => {
    const loadQuestions = async () => {
      const loadedQuestions = await getQuestion();
      setQuestions(
        loadedQuestions.map((q) => ({
          // set questions
          ...q,
          // put answers into shuffleArray function taht returns shuffled array as answers into setQuestions
          answers: shuffleArray([q.correctAnswer, ...q.incorrectAnswers]),
        }))
      );
    };
    loadQuestions();
  }, []);

  // Handle answer option click to be passed into questionCard function
  const handleAnswerClick = (selectedOption) => {
    setSelectedAnswer(selectedOption);
  };

  return (
    <div>
      <h1>Pub Triva</h1>
      {/* Map through questions and render QuestionCard for each, passing each element as a parameter */}
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          id={q.id}
          question={q.question}
          answers={q.answers}
          correctAnswer={q.correctAnswer}
          handleAnswerClick={handleAnswerClick}
          selectedAnswer={selectedAnswer}
        />
      ))}
      {/* Link to The Trivia API */}
      <a href="https://the-trivia-api.com/" target="_blank" rel="noopener noreferrer">
        TheTriviaAPI.com
      </a>
    </div>
  );
}

export default App;
