import QuizItem from "../QuizItem"
import { Button, CircularProgress } from "@mui/material"
import QuizResult from "../result"
import { useSelector } from "react-redux"
import { AppState } from "@/store/reducers"
import { useQuery } from "@tanstack/react-query"
import { quizListQuery } from "@/queries/quiz-queries"
import useQuizItem from "@/hooks/useQuizItem"
import useGameStatus from "@/hooks/useGameStatus"

export default function QuizList() {  
  const { status, index, startAt, endAt } = useSelector((state: AppState) => state.playing)
  const { correctList, wrongList } = useSelector((state: AppState) => state.answers)

  const { data } = useQuery({
    ...quizListQuery(),
    staleTime: Infinity,
    select: (data) => data.results
  })

  const {onStart, onEnd} = useGameStatus()
  const item = useQuizItem({
    list: data,
    index: index,
    onEnd: onEnd
  })

  return (
    <>
      {
        {
          ['not-start']: <Button variant="outlined" size="large" onClick={onStart}>퀴즈 풀기</Button>,
          ['playing']: item ? <QuizItem item={item} /> : <CircularProgress />,
          ['result']: <QuizResult startAt={startAt} endAt={endAt} correctList={correctList} wrongList={wrongList} />,
        }[status]
      }
    </>
  )
}