import { setStatus, setStartAt, setEndAt } from "@/store/reducers/playing";
import moment from "moment";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default function useGameStatus() {
  const dispatch = useDispatch()
  
  const onStart = useCallback(() => {
    dispatch(setStatus('playing'))
    dispatch(setStartAt(moment()))
  }, [dispatch]);

  const onEnd = useCallback(() => {
    dispatch(setStatus('result'))
    dispatch(setEndAt(moment()))
  }, [dispatch]);

  return {onStart, onEnd}
}