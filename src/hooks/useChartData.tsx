
import { Quiz } from "@/types/quiz-types"
import { ChartData } from "chart.js"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

type Props = {
  correctList: Array<Quiz>
  wrongList: Array<Quiz>
}

export default function useChartData({correctList, wrongList}: Props) {
  const dispatch = useDispatch()

  const [chartData, setChartData] = useState<ChartData<"pie", number[], unknown>>()

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
  }, [correctList, dispatch, wrongList])

  return chartData
}