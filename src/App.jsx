import { useEffect, useState } from 'react'
import './App.css'
import Quiz from './components/Quiz';

function App() {

  const [start,setStart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(0);

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  function fetchapi() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => {
      const formattedQuestions = data.results.map(question => {
        const options = shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer
        ]);
        return{
        question : question.question,
        options: options,
        correctAnswer: question.correct_answer,
        iscorrect: false,
        }
      })
      setQuestions(formattedQuestions);
      setLoading(false)
    })
    .catch(error => {
      console.error('Error fetching questions: ',error)
      setLoading(false)
    })
  }
  useEffect(()=> {

    fetchapi();

  }, [])

  const gameStart = () => {
    setStart(true)
  }
  if (loading) {
    return (
      <div className=' h-screen w-full flex flex-col justify-center items-center'>
        <img className=' z-[-1] absolute left-[-250px] bottom-[-250px] rotate-60' src="https://i0.wp.com/investors.kooth.com/wp-content/uploads/2020/08/blue-blob-1.png?ssl=1" alt="blob1" />
        <img className=' z-[-1] absolute right-[-300px] top-[-100px] rotate-60' src="https://www.sbw.org.il/wp-content/uploads/2020/07/blob-1100x440.png" alt="blob1" />
          <div className='loader'></div>
          <div className='text-[20px] mt-[5px] font-semibold'>Loading...</div>
      </div>
    )
  }

  const handleSubmit = () => {
    selectedAnswers.forEach((answer, index) => {
      setSubmitted(true);
      console.log(`Question ${index + 1} : Selected Answer - ${questions[index].options[answer]} and Correct Answer : ${questions[index].correctAnswer}`);
      if(questions[index].options[answer] === questions[index].correctAnswer){
        questions[index].iscorrect = true;
        setCount(preval => preval + 1)
      }
    })
  }

  const handleAnswerChange = (index, answer) => {
    const updateAnswers = [...selectedAnswers];
    updateAnswers[index] = answer;
    setSelectedAnswers(updateAnswers);
  }

  const elements = questions.map( (que, index) => (
    <Quiz 
      key={index}
      questionIndex={index}
      questions={que.question}
      options={que.options}
      correctAnswer={que.iscorrect}
      answer={que.correctAnswer}
      handleAnswerChange={handleAnswerChange}      
      submitted={submitted}
    />
  ))
  
  const playAgain = () => {
    setStart(false)
    setLoading(true);
    setQuestions([]);
    setSelectedAnswers([]);
    setSubmitted(false);
    setCount(0);
    fetchapi();
  }

  return (
    <div className=' h-screen w-full '>
      <img className=' z-[-1] absolute left-[-250px] bottom-[-250px] rotate-60' src="https://i0.wp.com/investors.kooth.com/wp-content/uploads/2020/08/blue-blob-1.png?ssl=1" alt="blob1" />
      <img className=' z-[-1] absolute right-[-300px] top-[-100px] rotate-60' src="https://www.sbw.org.il/wp-content/uploads/2020/07/blob-1100x440.png" alt="blob1" />
      {
        start ? 
          <>
            <div className=' ml-[50px] mr-[50px] mt-[50px] h-[95vh]'>      
              
              {elements}

              <div className='flex items-center justify-center mt-[10px]'> 
              {
                submitted ?
                    <div className='text-[25px] font-bold text-purple mt-[5px]'>
                      You Scored {count}/5 Answers 
                      <button 
                        className='h-[55px] w-[190px] bg-[#293264] text-[#F5F7FB] rounded text-[19px] font-poppins ml-[20px]' 
                        onClick={playAgain}
                        >Playagain</button>
                    </div>
                    :
                    <button 
                      className=' items-center h-[55px] w-[190px] bg-[#293264] text-[#F5F7FB] rounded'
                      onClick={handleSubmit}
                    >Submit</button>
              }
              </div>
            </div>
          </>
          :
          <div className=' h-screen flex justify-center items-center'>
            <div className=' h-[200px] w-[400px] flex flex-col items-center justify-around'>
              <div className= ' text-[2rem] font-Inter text-purple font-bold'>
                Quizzical
              </div>
              <div className=' font-poppins'>
                Are you smart enough to accept the challange?
              </div>
              <button className=' h-[55px] w-[190px] bg-[#293264] text-[#F5F7FB] rounded'
                onClick={gameStart}
              >Start Quiz</button>
            </div>
          </div>
      }
    </div>
  )
}

export default App
