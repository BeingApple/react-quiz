import QuizItem from "../QuizItem"
import { CircularProgress } from "@mui/material"
import QuizResult from "../result"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/store/reducers"
import { useQuery } from "@tanstack/react-query"
import { quizListQuery } from "@/queries/quiz-queries"
import useQuizItem from "@/hooks/useQuizItem"
import useGameStatus from "@/hooks/useGameStatus"
import { useEffect } from "react"
import { resetList } from "@/store/reducers/answers"
import { resetIndex, setStatus } from "@/store/reducers/playing"

export default function QuizList() {  
  const dispatch = useDispatch()
  const { status, index, startAt, endAt } = useSelector((state: AppState) => state.playing)
  const { correctList, wrongList } = useSelector((state: AppState) => state.answers)

  const { data, isSuccess } = useQuery({
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

  useEffect(() => {
    if (status === 'not-start' && isSuccess) {
      onStart()
    }
  }, [status, isSuccess, onStart])

  useEffect(() => {
    return () => {
      dispatch(resetIndex())
      dispatch(setStatus('not-start'))
      dispatch(resetList())
    }
  }, [data, dispatch])

  return (
    <>
      {
        {
          ['not-start']: <CircularProgress />,
          ['playing']: item ? <QuizItem item={item} /> : <CircularProgress />,
          ['result']: <QuizResult startAt={startAt} endAt={endAt} correctList={correctList} wrongList={wrongList} />,
        }[status]
      }
    </>
  )
}