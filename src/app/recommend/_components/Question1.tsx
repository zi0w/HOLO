import { useState } from 'react'
import type { Answer } from '@/app/recommend/_types/answer';
import AnswerList from '@/app/recommend/_components/AnswerList';

type QuestionProps = {
    prevAnswer: string;
    onNext: (data: Pick<Answer, "answer1">) => void;
}

const Question1 = ({prevAnswer, onNext}: QuestionProps) => {
    const [answer, setAnswer] = useState<Answer["answer1"]>(prevAnswer)

    const handleNext = () => {
        onNext({answer1})
    }
  return (
    <div>
      Question1
      <AnswerList answer={answer} onAnswerSelect={setAnswer}/>
      <Button
    </div>
  )
}

export default Question1
