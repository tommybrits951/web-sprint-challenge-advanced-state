import React from 'react'
import { connect} from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  
  const {inputChange, postQuiz} = props
  const {newFalseAnswer, newQuestion, newTrueAnswer} = props.form
  
  const onChange = evt => {
    evt.preventDefault()
    const {id, value} = evt.target
  inputChange(id, value)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    const obj = {
      "question_text": newQuestion,
      "true_answer_text": newTrueAnswer,
      "false_answer_text": newFalseAnswer
    }
    postQuiz(obj)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={newFalseAnswer} />
      <button id="submitNewQuizBtn" disabled={newQuestion.length > 1 && newFalseAnswer.length > 1 && newTrueAnswer.length > 1 ? null : true} >Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)