import React from 'react'
import type { Answer } from '@/app/recommend/_types/answer'

type ResultProps = {
  answerData: Answer
}

const Result = ({answerData}: ResultProps) => {
  return (
    <div>
      <h1>결과 페이지</h1>
      <ul>
        <li>답변 1: {answerData.answer1}</li>
        <li>답변 2: {answerData.answer2}</li>
        <li>답변 3: {answerData.answer3}</li>
        <li>답변 4: {answerData.answer4}</li>
      </ul>
    </div>
  )
}

export default Result