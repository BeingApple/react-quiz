import { Moment } from "moment"

export type PlayingStatus = 'not-start' | 'playing' | 'result'
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

export type Note = {
  recordAt?: Moment
  wrongList: Array<Quiz>
}