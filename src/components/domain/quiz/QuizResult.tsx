import QuizPaper from "../../ui-components/QuizPaper"
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material"
import { Moment } from "moment"
import { Quiz } from "@/types/quiz-types"
import { useEffect, useState } from "react"
import moment from "moment"
import { durationToString } from "@/utils/date-utils"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  startAt: Moment | null
  endAt: Moment | null
  correctList: Array<Quiz>
  wrongList: Array<Quiz>
  restart: () => void 
}

const QuizResult = ({startAt, endAt, correctList, wrongList, restart}: Props) => {
  const [timeString, setTimeString] = useState('')
  const [chartData, setChartData] = useState<ChartData<"pie", number[], unknown>>()

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
        data: [correctList.length, wrongList.length],
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
  }, [correctList, wrongList])

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
      <Button onClick={restart}>재시작</Button>
    </QuizPaper>
  )
}

export default QuizResult