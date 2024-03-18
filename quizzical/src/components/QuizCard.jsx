/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Button from './Button';

const QuizCard = ({
    id,
    question,
    correctAnswer,
    incorrectAnswers,
    selectedAnswer,
    onSelect,
    isSubmitted,
    category,
    difficulty
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  //When a new question is generated, collect all the possible answers in an array and then shuffle them
  //and save the shuffled answers array in state.
  useEffect(() => {
    const allAnswers = [...incorrectAnswers, correctAnswer];
    const shuffled = shuffleArray(allAnswers);
    setShuffledAnswers(shuffled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

    /**
        Shuffles an array in place.
        @param {Array} a - The array to shuffle.
   */
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  /**
   * Handles the selection of an answer by updating the selected answer state and calling the onSelect prop if the quiz is not yet submitted.
   * @param {string} answer - The selected answer.
   */
  const handleSelect = (answer) => {
    if (!isSubmitted) {
      onSelect(id, answer);
    }
  };

  const renderAnswers = () => {
    return shuffledAnswers.map((answer, index) => {
        let styles = undefined;

        if (selectedAnswer === answer) {
            styles = {backgroundColor: "#df2a4c", color: "white"}
        }
        if (isSubmitted && answer === correctAnswer) {
            styles = {backgroundColor: "#1d4b3b", color: "white"}
        } else if(isSubmitted && (selectedAnswer !== correctAnswer) && (answer === selectedAnswer)) {
            styles = {backgroundColor: "red", color: "white"}
        }

        return (
            <Button
              key={index}
              value={answer}
              isSelected={selectedAnswer === answer}
              isCorrect={isSubmitted && answer === correctAnswer}
              onSelect={handleSelect}
              isDisabled={isSubmitted}
              buttonStyles={styles} 
            />
          )
    });
  };

  return (
    <div className="quiz">
      <h2 className="quiz--question">{question}</h2>
      <div className="quiz--answers">{renderAnswers()}</div>
      <div className="quiz--tags">
        <div className="tag">{category}</div>
        <div className="tag">{difficulty}</div>
      </div>
    </div>
  );
};

export default QuizCard;