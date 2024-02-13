import { AppState } from "@/store/reducers"
import { onStart, onCorrect, onWrong, addIndex, onEnd } from "@/store/reducers/answers"
import { Quiz } from "@/types/quiz-types"
import moment from "moment"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

type Props = {
  items: Array<Quiz>
}

const QuizItem = ({items}: Props) => {
  const dispatch = useDispatch()
  const { startAt, endAt, index, wrongCount, correctCount } = useSelector((state: AppState) => state.answers)

  const [start, setStart] = useState(startAt != null)
  const [item, setItem] = useState<Quiz | undefined>()

  const onClickStart = () => {
    setStart(true)
    dispatch(onStart({startAt: moment()}))
  }

  const onClickAnswer = (answer: string) => {
    dispatch(item!.correct_answer === answer ? onCorrect() : onWrong())
    dispatch(addIndex())

    if (index === items.length - 1) { 
      dispatch(onEnd({endAt: moment()}))
    }
  }

  useEffect(() => {
    setItem(items?.at(index))
  }, [items, index, setItem])

  return (
    <>
      {start && item ? (
        <>
          <p>{item.category}</p>
          <p>{item.difficulty}</p>
          <p>{item.question}</p>
          <ul>
            {item.answers?.sort(() => Math.random() - 0.5).map((answer, i) => (
              <li key={i}>
                <button onClick={() => onClickAnswer(answer)}>{answer}</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p>{index} / {wrongCount} / {correctCount} / {startAt?.format()} / {endAt?.format()}</p>
          <button onClick={onClickStart}>시작하기</button>
        </>
      )}
    </>
  )
}

export default QuizItem