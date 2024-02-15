import { AppState } from "@/store/reducers";
import { resetList } from "@/store/reducers/answers";
import { setStartAt, setEndAt } from "@/store/reducers/playing";
import { PlayingStatus } from "@/types/quiz-types";
import moment from "moment";
import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

const usePlayingStatus = () => {
  const dispatch = useDispatch()
  const { startAt, endAt } = useSelector((state: AppState) => state.playing)
  const { wrongList, correctList } = useSelector((state: AppState) => state.answers)

  const [status, setStatus] = useState<PlayingStatus>('not-start')

  const onStart = useCallback(() => {
    setStatus('playing')
    dispatch(setStartAt(moment()))
  }, [dispatch]);

  const onEnd = useCallback(() => {
    setStatus('result')
    dispatch(setEndAt(moment()))
  }, [dispatch]);

  const onRetry = useCallback(() => {
    setStatus('not-start')
    dispatch(resetList())
  }, [dispatch]);

  return {status, startAt, endAt, wrongList, correctList, onStart, onEnd, onRetry}
}

export default usePlayingStatus