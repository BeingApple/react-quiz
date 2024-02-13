import { quizListQuery } from "@/queries/quiz-queries"
import { useQuery } from "@tanstack/react-query"

export type Props = {
  isStart?: boolean
  index?: number
}

export const QuizList = ({isStart, index}: Props) => {
  const { data } = useQuery({
    ...quizListQuery(),
    select: (data) => {
      const list = data.results
      return list.map(quiz => ({
        answers: quiz.incorrect_answers.concat(quiz.correct_answer).sort(() => Math.random() - 0.5),
        ...quiz
      }))
    }
  })

  return (
    <>
      {data?.map((row, index) => {
        <p>{row.answers}</p>
      })}
    </>
  )
}