import React, { useState } from "react";
import './Quiz.css'
import he from 'he';

function Quiz({questionIndex, questions, options, correctAnswer, answer, handleAnswerChange, submitted}) {

    const [selectedOption, setSelectedOption] = useState(null)

    const handleOptionChange = (e) => {
        setSelectedOption(parseInt(e.target.value))
        handleAnswerChange(questionIndex, e.target.value)
    }
    function colorChange(index) {
        if(submitted===false && selectedOption === index) {
            return "bg-[#D6DBF5]"
        }
        if(submitted && correctAnswer && selectedOption === index){
            return "bg-[limegreen]"
        }
        if (submitted && answer === options[index]) {
            return "bg-[limegreen]"
        }
        if(submitted && !correctAnswer && selectedOption === index){
            return "bg-[#cd5c5c]"
        }
    }
    
    return(
        <div className=" flex flex-col items-start mt-[10px] max-h-[19vh] overflow-hidden xl:items-center">
           <h3 className=" text-[19px] mb-[5px] font-semibold text-purple">{he.decode(questions)}</h3>
           <div className="">
            {options.map((option, index) => (
                <label key={index}
                    className={`${colorChange(index)} p-[10px] mr-[5px]`}
                >
                    <input
                        type="radio"
                        name={`option-${questionIndex}`}
                        value={index}
                        hidden={true}
                        checked={selectedOption === index}
                        onChange={handleOptionChange}
                        disabled={submitted}
                    />
                    {option}
                </label>
            ))}
           </div>
           <div className='h-[0.9px] w-full bg-purple mt-[10px]'></div>
        </div>
    )
}

export default Quiz