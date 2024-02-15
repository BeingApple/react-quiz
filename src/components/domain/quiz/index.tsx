import QuizItem from "./QuizItem"
import { Button } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import usePlayingStatus from "@/hooks/usePlayingStatus"
import QuizResult from "./QuizResult"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/store/reducers"
import { resetIndex } from "@/store/reducers/playing"
import { useQuery } from "@tanstack/react-query"
import { quizListQuery } from "@/queries/quiz-queries"
import { Quiz } from "@/types/quiz-types"

export default function QuizList() {  
  const dispatch = useDispatch()

  const { index } = useSelector((state: AppState) => state.playing)
  const {status, onStart, onEnd, onRetry, ...resultStat} = usePlayingStatus()

  const { data, refetch } = useQuery({
    ...quizListQuery(),
    staleTime: Infinity,
    select: (data) => data.results
  })

  const [item, setItem] = useState<Quiz | undefined>()

  const onReset = useCallback(() => {
    dispatch(resetIndex())
    refetch()
    onRetry()
  }, [dispatch, onRetry, refetch])
  
  useEffect(() => {
    if (index >= (data?.length ?? 0) - 1 ) {
      onEnd()
    }
  }, [data?.length, index, onEnd])

  useEffect(() => {
    const item = data?.at(index)

    if (item) {
      const answers = item?.incorrect_answers
        .concat(item.correct_answer)
        .sort(() => Math.random() - 0.5)
 
      setItem({answers: answers, ...item})
    }
  }, [data, index])

  return (
    <>
      {
        {
          ['not-start']: <Button variant="outlined" size="large" onClick={onStart}>퀴즈 풀기</Button>,
          ['playing']: <QuizItem item={item} />,
          ['result']: <QuizResult restart={onReset} {...resultStat} />,
        }[status]
      }
    </>
  )
}