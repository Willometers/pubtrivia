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
  <Button
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
  <Card key={id} style={{ width: '35rem' }}>
    <h2>{question}</h2>
    {answers.map((option, index) => (
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

  // Fetch questions and shuffle answer options on component mount
  useEffect(() => {
    const loadQuestions = async () => {
      const loadedQuestions = await getQuestion();
      setQuestions(
        loadedQuestions.map((q) => ({
          ...q,
          answers: shuffleArray([q.correctAnswer, ...q.incorrectAnswers]),
        }))
      );
    };
    loadQuestions();
  }, []);

  // Handle answer option click
  const handleAnswerClick = (selectedOption) => {
    setSelectedAnswer(selectedOption);
  };

  return (
    <div>
      <h1>Quiz App</h1>
      {/* Map through questions and render QuestionCard for each */}
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
        The Trivia API
      </a>
    </div>
  );
}

export default App;
