import { AppState } from "@/store/reducers"
import { useSelector } from "react-redux"
import QuizPaper from "../../ui-components/QuizPaper"
import { Moment } from "moment"
import { Button, Typography } from "@mui/material"

type Props = {
  restart: () => void 
}

const QuizResult = ({restart}: Props) => {
  const { startAt, endAt, wrongList, correctList } = useSelector((state: AppState) => state.answers)

  return (
    <QuizPaper>
      <Typography>{startAt?.toString()}</Typography>
      <Typography>{endAt?.toString()}</Typography>
      <Typography>{correctList.length} / {wrongList.length}</Typography>
      <Button onClick={restart}>재시작</Button>
    </QuizPaper>
  )
}

export default QuizResult