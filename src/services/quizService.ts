import client from "./clients/client"

type QuizType = 'multiple' | 'boolean'
type QuizDifficulty = 'easy' | 'medium' | 'hard'

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
  results: Array<{
    type: QuizType
    difficulty: QuizDifficulty
    category: string
    question: string
    correct_answer: string
    incorrect_answers: Array<string>
  }>
}

export async function getQuizList(request: GetQuizListRequest = {amount: 10, type: 'multiple'}) {
  const {...params} = request

  const response: GetQuizListResponse = await client.get('api.php', {
    params,
  })

  console.log(response)

  return response
}