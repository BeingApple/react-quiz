import { Note } from "@/types/quiz-types";
import { useEffect, useState } from "react";

type Props = {
  noteList: Array<Note>
}

export default function useCheckEmptyNote({noteList}: Props) {
  const [empty, setEmpty] = useState(noteList.length == 0)

  useEffect(() => {
    setEmpty(noteList.length == 0)
  }, [noteList])

  return {isEmpty: empty}
}