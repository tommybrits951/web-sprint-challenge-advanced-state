import axios from "axios"
import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from "./action-types"

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE, payload: 1
  }
 }

export function moveCounterClockwise() { 
  return({
    type: MOVE_COUNTERCLOCKWISE, payload: 1
  })
}

export function selectAnswer(num) {
  return{
    type: SET_SELECTED_ANSWER, payload: num
  }
 }

export function setMessage(message) {
  return({type: SET_INFO_MESSAGE, payload: `${message}`})
 }

export function setQuiz(str) { 
  
  return (
    {type: SET_QUIZ_INTO_STATE, payload: str}
  )
}

export function inputChange(id, value) {
    
    return({type: INPUT_CHANGE, payload: {id: id, value: value.trim()}})
 }

export function resetForm() {
  return({type: RESET_FORM})
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null))
    axios.get("http://localhost:9000/api/quiz/next")
    .then(res => {
    dispatch(setQuiz(res.data))
    })
    .catch(err => console.error(err))
    
    
    
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(answer) {
  return function (dispatch) {
    axios.post(`http://localhost:9000/api/quiz/answer`, answer)
    // On successful POST:
    .then(res => {
      
      const message = res.data.message
      dispatch(setMessage(message))
    })
    .catch(err => console.error(err))
    .finally(() => {
      dispatch(fetchQuiz())

    })
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(quiz) {
  return function (dispatch) {
    // On successful POST:
    axios.post(`http://localhost:9000/api/quiz/new`, quiz)
    .then(res => {
      console.log(res)
      dispatch(setMessage(res.status === 201 ? `Congrats: "${quiz.question_text}" is a great question!` : ''))

    })
    .catch(err => console.error(err))
    .finally(() => {
      dispatch(resetForm())
    })
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
