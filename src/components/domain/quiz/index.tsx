import { quizListQuery } from "@/queries/quiz-queries"
import { useQuery } from "@tanstack/react-query"
import QuizItem from "./QuizItem"
import { AppState } from "@/store/reducers"
import { onStart} from "@/store/reducers/answers"
import { Button } from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Quiz } from "@/types/quiz-types"


export const QuizList = () => {  
  const dispatch = useDispatch()
  const { startAt, endAt, index } = useSelector((state: AppState) => state.answers)

  const [start, setStart] = useState(startAt != null)
  const [item, setItem] = useState<Quiz>();

  const { data, refetch } = useQuery({
    ...quizListQuery(),
    staleTime: Infinity,
    select: (data) => data.results
  })

  const onClickStart = () => {
    setStart(true)
    dispatch(onStart({startAt: moment()}))
  }

  useEffect(() => {    
    setItem(data?.at(index))
  }, [index, data])

  return (
    <>
      {start && item ? (
        <QuizItem item={item} />
      ) : (
        <>
          <p>{index} / {startAt?.format()} / {endAt?.format()}</p>
          <Button variant="outlined" size="large" onClick={onClickStart}>퀴즈 풀기</Button>
        </>
      )}
    </>
  )
}