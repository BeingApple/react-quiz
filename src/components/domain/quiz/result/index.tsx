import QuizPaper from "../../../ui-components/quiz/QuizPaper"
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material"
import { Moment } from "moment"
import { useCallback } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query"
import { quizListQuery } from "@/queries/quiz-queries"
import { useDispatch } from "react-redux"
import { resetList } from "@/store/reducers/answers"
import { resetIndex, setStatus } from "@/store/reducers/playing"
import useDurationTimeString from "@/hooks/useDurationTimeString"
import useChartData from "@/hooks/useChartData"
import { Quiz } from "@/types/quiz-types"
import { useRouter } from "next/router"
import { addNote } from "@/store/reducers/note";
import { showSnackbar } from "@/store/reducers/snackbar";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  startAt: Moment | null
  endAt: Moment | null
  correctList: Array<Quiz>
  wrongList: Array<Quiz>
}

const QuizResult = ({startAt, endAt, correctList, wrongList}: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const chartData = useChartData({
    wrongList: wrongList,
    correctList: correctList
  })
  const timeString = useDurationTimeString({
    startAt: startAt,
    endAt: endAt
  })

  const { refetch } = useQuery({
    ...quizListQuery(),
    staleTime: Infinity,
    select: (data) => data.results
  })

  const onReset = useCallback(() => {
    if (wrongList.length > 0) {
      dispatch(addNote(wrongList))
      dispatch(showSnackbar({
        message: '오답노트가 저장되었습니다.',
      }))
    }

    refetch()
    dispatch(resetIndex())
    dispatch(setStatus('not-start'))
    dispatch(resetList())

    router.push('/')
  }, [dispatch, refetch, router, wrongList])

  return (
    <QuizPaper>
      <Box sx={{p: 2}}>
        <Typography variant="h5" component="div">결과</Typography>
      </Box>
      <Divider />
      <Box sx={{p: 2}}>
        <Stack spacing={2}>
          <QuizPaper>
            <Typography variant="body2" color="text.secondary">소요된 시간 : {timeString}</Typography>
          </QuizPaper>
          <QuizPaper>
            <Typography variant="body2" color="text.secondary">정답 개수 : {correctList.length}</Typography>
          </QuizPaper>
          <QuizPaper>
            <Typography variant="body2" color="text.secondary">오답 개수 : {wrongList.length}</Typography>
          </QuizPaper>
          <Card>
            <CardContent>
              {chartData && <Pie data={chartData} /> }
            </CardContent>
          </Card>
        </Stack>
      </Box>
      <Button onClick={onReset}>재시작</Button>
    </QuizPaper>
  )
}

export default QuizResult