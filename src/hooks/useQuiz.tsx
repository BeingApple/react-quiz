import { quizListQuery } from "@/queries/quiz-queries"
import { onCorrect, onWrong, resetList } from "@/store/reducers/answers"
import { Quiz } from "@/types/quiz-types"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const useQuiz = (index: number) => {
  const dispatch = useDispatch()

  const { data, refetch } = useQuery({
    ...quizListQuery(),
    staleTime: Infinity,
    select: (data) => data.results
  })

  const [isCorrect, setCorrect] = useState<boolean>();
  const [isAnswered, setAnswered] = useState(false);
  const [item, setItem] = useState<Quiz | undefined>()

  const onClickAnswer = useCallback((answer: string) => {
    const isCorrect = item!.correct_answer === answer
    const answerData = {select_answer: answer, ...item}

    setCorrect(isCorrect)
    setAnswered(true)
    
    dispatch(isCorrect ? onCorrect(answerData) : onWrong(answerData))
  }, [dispatch, item])


  useEffect(() => {
    const item = data?.at(index)

    if (item) {
      const answers = item?.incorrect_answers
        .concat(item.correct_answer)
        .sort(() => Math.random() - 0.5)
 
      setItem({answers: answers, ...item})
    }

    return () => {
      setCorrect(undefined)
      setAnswered(false)
    }
  }, [data, index])


  return {size: data?.length ?? 0, item, isCorrect, isAnswered, onClickAnswer, refetch}
}

export default useQuiz