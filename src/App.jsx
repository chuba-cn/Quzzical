import { useState } from "react";
import Home from "./components/Home";
import QuizContainer from "./components/QuizContainer";

const App = () => {
    const [gameStart, setGameStart] = useState(true);

    function startQuiz(){
        setGameStart(prevState => !prevState);
    }

    return (
        <main>
            {gameStart ? <Home startQuiz={startQuiz} /> : <QuizContainer/>}
        </main>
    );
}

export default App