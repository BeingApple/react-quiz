import { Quiz, QuizDifficulty, QuizType } from "@/types/quiz-types"
import client from "./clients/client"

//* Requests */
export type GetQuizListRequest = {
  amount?: Number
  difficulty?: QuizDifficulty
  type?: QuizType
  token?: string
}

//* Response */
type GetQuizListResponse = {
  response_code: number
  results: Array<Quiz>
}

export async function getQuizList(request: GetQuizListRequest = {amount: 10, type: 'multiple'}) {
  const {...params} = request

  const response: GetQuizListResponse = await client.get('api.php', {
    params,
  })

  return response
}