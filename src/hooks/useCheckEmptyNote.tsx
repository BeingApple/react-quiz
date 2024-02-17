import { AppState } from "@/store/reducers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useCheckEmptyNote() {
  const { noteList } = useSelector((state: AppState) => state.note)

  const [empty, setEmpty] = useState(noteList.length == 0)

  useEffect(() => {
    setEmpty(noteList.length == 0)
    console.log(noteList)
  }, [noteList])

  return {isEmpty: empty}
}