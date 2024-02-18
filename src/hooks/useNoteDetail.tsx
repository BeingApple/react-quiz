import { Note, Quiz } from "@/types/quiz-types"
import { useEffect, useState } from "react"

type Props = {
  noteList: Note[]
  index: number
}

export default function useNoteDetail({noteList, index}: Props) {
  const [quiz, setQuiz] = useState<Array<Quiz>>()

  useEffect(() => {
    const detail = noteList.at(index)

    setQuiz(detail?.wrongList)
  }, [noteList, index])

  return {quiz}
}