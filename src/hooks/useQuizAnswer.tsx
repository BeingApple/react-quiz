import { onCorrect, onWrong } from "@/store/reducers/answers";
import { Quiz } from "@/types/quiz-types";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  item?: Quiz
  isNote?: boolean
}

export default function useQuizAnswer({item, isNote}: Props) {
  const dispatch = useDispatch()

  const [isCorrect, setCorrect] = useState<boolean>();
  const [isAnswered, setAnswered] = useState(false);

  const onClickAnswer = useCallback((answer: string) => {
    const isCorrect = item?.correct_answer === answer
    const answerData = {select_answer: answer, ...item}

    setCorrect(isCorrect)
    setAnswered(true)
    
    if (isNote != true) {
      dispatch(isCorrect ? onCorrect(answerData) : onWrong(answerData))
    }
  }, [dispatch, item, isNote])

  useEffect(() => {
    return () => {
      setCorrect(undefined)
      setAnswered(false)
    }
  }, [item])

  return {isCorrect, isAnswered, onClickAnswer}
}