import { useState, useEffect } from "react";
import QuizCard from "./QuizCard";

const QuizContainer = () => {
    const [questions, setQuestions] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // Fetch initial questions when the component mounts
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch(`https://the-trivia-api.com/v2/questions?limit=5&categories=science,film_and_tv&difficulties=easy,medium`);
            if (!response.ok) {
                throw new Error("Failed to fetch questions");
            }
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const handleSelectAnswer = (questionId, selectedAnswer) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId ? { ...question, selectedAnswer } : question
            )
        );
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        calculateCorrectCount();
    };

    const calculateCorrectCount = () => {
        let count = 0;
        questions.forEach(question => {
            if (question.selectedAnswer === question.correctAnswer) {
                count++;
            }
        });
        setCorrectCount(count);
    };

    const handlePlayAgain = async () => {
        setIsSubmitted(false);
        setCorrectCount(0);
        // Clear selected answers
        setQuestions(prevQuestions =>
            prevQuestions.map(question => ({ ...question, selectedAnswer: null }))
        );
        // Fetch new questions
        await fetchQuestions();
    };

    return (
        <section className="quiz-container">
            <header className="heading quiz-header">Quizzically</header>
            {questions.map(question => (
                <QuizCard
                    key={question.id}
                    id={question.id}
                    question={question.question.text}
                    correctAnswer={question.correctAnswer}
                    incorrectAnswers={question.incorrectAnswers}
                    selectedAnswer={question.selectedAnswer}
                    onSelect={handleSelectAnswer}
                    isSubmitted={isSubmitted}
                    category={question.category}
                    difficulty={question.difficulty}
                />
            ))}
            <div className="quiz-feedback">
                {isSubmitted && (
                    <h2>You scored {`${correctCount} / ${questions.length}`} correct answers</h2>
                )}
                <button className="quiz-submit" onClick={isSubmitted ? handlePlayAgain : handleSubmit}>
                    {isSubmitted ? 'Play Again' : 'Check Answers'}
                </button>
            </div>
        </section>
    );
};

export default QuizContainer;