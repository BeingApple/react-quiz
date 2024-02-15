import QuizItem from "./QuizItem"
import { Button } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import QuizResult from "./QuizResult"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/store/reducers"
import { useQuery } from "@tanstack/react-query"
import { quizListQuery } from "@/queries/quiz-queries"
import { Quiz } from "@/types/quiz-types"
import { setEndAt, setStartAt, setStatus } from "@/store/reducers/playing"
import moment from "moment"

export default function QuizList() {  
  const dispatch = useDispatch()

  const { status, index, startAt, endAt } = useSelector((state: AppState) => state.playing)
  const { correctList, wrongList } = useSelector((state: AppState) => state.answers)

  const { data } = useQuery({
    ...quizListQuery(),
    staleTime: Infinity,
    select: (data) => data.results
  })

  const [item, setItem] = useState<Quiz | undefined>()

  const onStart = useCallback(() => {
    dispatch(setStatus('playing'))
    dispatch(setStartAt(moment()))
  }, [dispatch]);

  const onEnd = useCallback(() => {
    dispatch(setStatus('result'))
    dispatch(setEndAt(moment()))
  }, [dispatch]);
  
  useEffect(() => {
    if (status == 'playing' && index >= (data?.length ?? 0) ) {
      onEnd()
    }
  }, [data, index, onEnd, status])

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
          ['result']: <QuizResult startAt={startAt} endAt={endAt} correctCount={correctList.length} wrongCount={wrongList.length} />,
        }[status]
      }
    </>
  )
}