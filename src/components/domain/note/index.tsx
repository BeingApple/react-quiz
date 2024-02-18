import useNoteDetail from "@/hooks/useNoteDetail"
import { AppState } from "@/store/reducers"
import { useSelector } from "react-redux"
import QuizItem from "../quiz/QuizItem"
import useQuizItem from "@/hooks/useQuizItem"
import { useCallback } from "react"
import { useRouter } from "next/router"

type Props = {
  index: number
}

export default function NoteDetail({index:noteIndex}: Props) {
  const router = useRouter()

  const { noteList } = useSelector((state: AppState) => state.note)
  const { index: quizIndex } = useSelector((state: AppState) => state.playing)

  const onEnd = useCallback(() => {
    router.push('/note/list')
  }, [router])

  const {quiz} = useNoteDetail({
    noteList: noteList,
    index: noteIndex
  }) 

  const item = useQuizItem({
    list: quiz,
    index: quizIndex,
    onEnd: onEnd
  })
  
  return <QuizItem item={item} isNote />
}