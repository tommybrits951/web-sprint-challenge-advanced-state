import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators'
import React, {useEffect} from 'react'
import { connect } from 'react-redux'
function Quiz(props) {
  const {quiz, fetchQuiz, picked, selectAnswer, postAnswer} = props
  
  const clickHandle = () => {
    const obj = {
      quiz_id: quiz.quiz_id,
      answer_id: picked
    }
    console.log(obj)
    postAnswer(obj)
  }

useEffect(() => {
!quiz && fetchQuiz()
}, [])


  return (
    <div id="wrapper">
      
      
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz !== null ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
            
            {quiz.answers.map((answer, idx) => {
              return (
                <div className={`${picked === answer.answer_id ? "selected" : null} answer`} key={idx}>{answer.text}<button onClick={() => selectAnswer(answer.answer_id)}>{picked === answer.answer_id ? "SELECTED" : "select"}</button></div>
              )
            })}
            </div>

            <button id="submitAnswerBtn" onClick={clickHandle} disabled={picked !== null ? null : "disabled"}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
const mapStateToProps = (state) => {
  return({
    quiz: state.quiz,
    picked: state.selectedAnswer
  })
}
export default connect(mapStateToProps, {fetchQuiz, selectAnswer, postAnswer})(Quiz)