import { quizListQuery } from "@/queries/quiz-queries"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export type Props = {
  isStart?: boolean
  index?: number
}

export const QuizList = ({isStart, index}: Props) => {
  const { data } = useQuery({
    ...quizListQuery(),
    select: (data) => data.results.map(quiz => ({
      answers: quiz.incorrect_answers.concat(quiz.correct_answer).sort(() => Math.random() - 0.5),
      ...quiz
    }))
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      {data?.join("/")}
    </>
  )
}