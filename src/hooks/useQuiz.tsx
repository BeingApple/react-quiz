import { quizListQuery } from "@/queries/quiz-queries"
import { onCorrect, onEnd, onStart, onWrong } from "@/store/reducers/answers"
import { Quiz } from "@/types/quiz-types"
import { useQuery } from "@tanstack/react-query"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const useQuiz = () => {
  const dispatch = useDispatch()

  const { data, refetch } = useQuery({
    ...quizListQuery(),
    staleTime: Infinity,
    select: (data) => data.results
  })

  const [playing, setPlaying] = useState(false)
  const [end, setEnd] = useState(false)
  const [isCorrect, setCorrect] = useState<boolean>();
  const [isAnswered, setAnswered] = useState(false);
  const [index, setIndex] = useState<number>(0)
  const [item, setItem] = useState<Quiz | undefined>()

  const start = () => {
    setPlaying(true)
    setEnd(false)
    setIndex(0)
    dispatch(onStart(moment()))
  }


  const onClickAnswer = (answer: string) => {
    const isCorrect = item!.correct_answer === answer
    const answerData = {select_answer: answer, ...item}

    setCorrect(isCorrect)
    setAnswered(true)
    
    dispatch(isCorrect ? onCorrect(answerData) : onWrong(answerData))
  }

  const onNext = () => {
    setIndex((prev) => ++prev)
    setAnswered(false)
  }

  const restart = () => {
    refetch()
  }

  useEffect(() => {
    const item = data?.at(index)

    if (item) {
      item.answers = item?.incorrect_answers
        .concat(item.correct_answer)
        .sort(() => Math.random() - 0.5)

      setItem(item)
    }
  }, [data, index])

  useEffect(() => {
    if (playing && data && index >= data.length) {
      setPlaying(false)
      setEnd(true)
      dispatch(onEnd(moment()))
    }
  }, [data, dispatch, index, playing])

  return {playing, end, item, isCorrect, isAnswered, start, onClickAnswer, onNext, restart}
}

export default useQuiz