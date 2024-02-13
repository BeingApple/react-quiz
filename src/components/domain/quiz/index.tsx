import { quizListQuery } from "@/queries/quiz-queries"
import { useQuery } from "@tanstack/react-query"
import QuizItem from "./QuizItem"


export const QuizList = () => {  
  const { data } = useQuery({
    ...quizListQuery(),
    select: (data) => data.results.map(quiz => ({
      answers: quiz.incorrect_answers.concat(quiz.correct_answer),
      ...quiz
    }))
  })

  return (
    <QuizItem items={data ?? []} />
  )
}