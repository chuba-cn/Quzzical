/* eslint-disable react/prop-types */
export default function Home({startQuiz}) {
  return (
    <section className='home'>
        <h1 className="home--heading">Quizzically</h1>
        <p className="home--text">A trivia game for learning and testing yourself on different topics</p>
        <button className="home--button" onClick={startQuiz}>Start Quiz</button>
    </section>
  )
}