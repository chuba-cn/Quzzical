/* eslint-disable react/prop-types */
export default function Home({startQuiz}) {
  return (
    <section className='home'>
        <h1 className="heading">Quizzically</h1>
        <button className="home--button" onClick={startQuiz}>Start Quiz</button>
    </section>
  )
}