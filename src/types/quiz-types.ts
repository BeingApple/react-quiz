export type QuizType = 'multiple' | 'boolean'
export type QuizDifficulty = 'easy' | 'medium' | 'hard'

export type Quiz = {
  type: QuizType
  difficulty: QuizDifficulty
  category: string
  question: string
  correct_answer: string
  incorrect_answers: Array<string>
  answers?: Array<string>
  select_answer?: string
}