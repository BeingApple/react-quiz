import QuizPaper from "../../ui-components/QuizPaper"
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material"
import { Moment } from "moment"
import { useCallback, useEffect, useState } from "react"
import moment from "moment"
import { durationToString } from "@/utils/date-utils"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query"
import { quizListQuery } from "@/queries/quiz-queries"
import { useDispatch } from "react-redux"
import { resetList } from "@/store/reducers/answers"
import { resetIndex, setStatus } from "@/store/reducers/playing"

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  startAt: Moment | null
  endAt: Moment | null
  correctCount: number
  wrongCount: number
}

const QuizResult = ({startAt, endAt, correctCount, wrongCount}: Props) => {
  const dispatch = useDispatch()
  
  const [timeString, setTimeString] = useState('')
  const [chartData, setChartData] = useState<ChartData<"pie", number[], unknown>>()

  const { refetch } = useQuery({
    ...quizListQuery(),
    staleTime: Infinity,
    select: (data) => data.results
  })

  const onReset = useCallback(() => {
    refetch()
    dispatch(resetIndex())
    dispatch(setStatus('not-start'))
    dispatch(resetList())
  }, [dispatch, refetch])

  useEffect(() => {
    if (startAt && endAt) {
      const duration = moment.duration(endAt.diff(startAt))
      setTimeString(durationToString(duration))
    }
  }, [startAt, endAt])

  useEffect(() => {
    const data = {
      labels: ['정답', '오답'],
      datasets: [{
        label: '갯수',
        data: [correctCount, wrongCount],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      }]
    }

    setChartData(data)
  }, [correctCount, wrongCount])

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
            <Typography variant="body2" color="text.secondary">정답 개수 : {correctCount}</Typography>
          </QuizPaper>
          <QuizPaper>
            <Typography variant="body2" color="text.secondary">오답 개수 : {wrongCount}</Typography>
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