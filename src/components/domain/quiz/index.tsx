import QuizItem from "./QuizItem"
import { Button } from "@mui/material"
import useQuiz from "@/hooks/useQuiz"
import QuizResult from "./QuizResult"

export const QuizList = () => {  
  const {playing, end, start, restart, ...quiz} = useQuiz()

  return (
    <>
      {playing ? (
        <QuizItem {...quiz} />
      ) : 
        end ? (
          <QuizResult restart={restart} />
        ) 
        : (
          <Button variant="outlined" size="large" onClick={start}>퀴즈 풀기</Button>
        )}
    </>
  )
}