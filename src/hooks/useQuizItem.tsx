import { Quiz } from "@/types/quiz-types"
import { useEffect, useState } from "react"

type Props = {
  list?: Quiz[]
  index: number
  onEnd: () => void
}

export default function useQuizItem({list, index, onEnd}: Props) {
  const [item, setItem] = useState<Quiz | undefined>()

  useEffect(() => {
    const item = list?.at(index)

    if (item) {
      const answers = item?.incorrect_answers
        .concat(item.correct_answer)
        .sort(() => Math.random() - 0.5)
 
      setItem({answers: answers, ...item})
    }
  }, [list, index])

  useEffect(() => {
    if (list && index >= (list.length ?? 0) ) {
      onEnd()
    }
  }, [list, index, onEnd])

  return item
}