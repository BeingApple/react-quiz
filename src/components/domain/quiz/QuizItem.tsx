import { AppState } from "@/store/reducers"
import { onCorrect, onWrong, addIndex } from "@/store/reducers/answers"
import { Quiz } from "@/types/quiz-types"
import { Button, Typography, Paper, Card, CardContent, styled, Divider, Box, CardActionArea, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {decode} from 'html-entities';

const QuizPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'left',
  minWidth: 500,
}));

type Props = {
  item: Quiz
}

const QuizItem = ({item}: Props) => {
  const dispatch = useDispatch()
  const { index } = useSelector((state: AppState) => state.answers)

  const [answers, setAnswers] = useState<Array<string>>()
  const [isCorrect, setCorrect] = useState<boolean>();
  const [isAnswered, setAnswered] = useState(false);

  const onClickAnswer = (answer: string) => {
    const isCorrect = item!.correct_answer === answer

    setCorrect(isCorrect)
    setAnswered(true)
    
    dispatch(isCorrect ? onCorrect(item) : onWrong(item))
  }

  const onNext = () => {
    dispatch(addIndex())
  }

  useEffect(() => {
    setAnswers(item.incorrect_answers
      .concat(item.correct_answer)
      .sort(() => Math.random() - 0.5))

      setAnswered(false)
  }, [item])

  return (
    <QuizPaper>
        <Box sx={{p: 2}}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{decode(item.category)}</Typography>
          <Typography variant="h5" component="div">{decode(item.question)}</Typography>
        </Box>
        <Divider />
        <Box sx={{p: 2}}>
          {isAnswered ? (
            <Box sx={{textAlign: 'center'}}>
              <Typography variant="h5" component="div" color={isCorrect? "green" : "red"}>{isCorrect ? '정답' : '오답'}</Typography>
              <Button variant="outlined" size="large" onClick={onNext} sx={{m: 2}}>다음 문제</Button>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {answers?.map((answer, i) => (
                <Grid item key={i}>
                  <Card sx={{p: 2, width: 200, height: "100%"}}>
                    <CardActionArea onClick={() => onClickAnswer(answer)}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">{i+1}</Typography>
                        <Typography variant="body2" color="text.secondary">{decode(answer)}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
    </QuizPaper>
  )
}

export default QuizItem