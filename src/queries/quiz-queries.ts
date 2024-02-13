import { quizService } from '@/services'
import { GetQuizListRequest } from '@/services/quizService'

export const quizQueryKey = ['quiz']

export const quizListQuery = (request?: GetQuizListRequest) => ({
  queryKey: [...quizQueryKey, 'list', request],
  queryFn: () => quizService.getQuizList(request)
})