import { useState, useEffect } from 'react'
import { getQuestion } from './utils/questionsAPI';
import './App.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function App() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const loadQuestions = async () => {
      const loadedQuestions = await getQuestion();
      setQuestions(loadedQuestions);
    };
    // Call the function to execute it
    loadQuestions();
  }, []);

console.log(questions)

  return (
    <div>
      {/* Render your Quiz App with the loaded questions */}
      <h1>Quiz App</h1>

      {questions.map((question) => (
        <Card style={{ width: '35rem' }}>
        <h2>{question.question}</h2>
        <Button>{question.correctAnswer}</Button>
        {question.incorrectAnswers.map((a) => (
          <Button>{a}</Button>
        ))}
        {/* should i create the array of answers outside of here? */}
        </Card>
      ))}
  
    </div>
  );
}

export default App
