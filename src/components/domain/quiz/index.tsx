import QuizItem from "./QuizItem"
import { Button } from "@mui/material"
import useQuiz from "@/hooks/useQuiz"
import { useCallback, useState } from "react"
import usePlayingStatus from "@/hooks/usePlayingStatus"
import QuizResult from "./QuizResult"

export const QuizList = () => {  
  const [index, setIndex] = useState(0)

  const {status, onStart, onEnd, onRetry, ...resultStat} = usePlayingStatus()
  const {size, refetch, ...quiz} = useQuiz(index)

  const onNext = useCallback(() => {
    setIndex((prev) => ++prev)

    if (index >= size - 1 ) {
      onEnd()
    }
  }, [index, onEnd, size])

  const onReset = useCallback(() => {
    setIndex(0)
    refetch()
    onRetry()
  }, [onRetry, refetch])

  return (
    <>
      {
        {
          ['not-start']: <Button variant="outlined" size="large" onClick={onStart}>퀴즈 풀기</Button>,
          ['playing']: <QuizItem {...quiz} onNext={onNext} />,
          ['result']: <QuizResult restart={onReset} {...resultStat} />,
        }[status]
      }
    </>
  )
}