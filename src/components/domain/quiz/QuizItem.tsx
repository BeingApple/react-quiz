import { Quiz } from "@/types/quiz-types"
import { Button, Typography, Card, CardContent, Divider, Box, CardActionArea, Grid, Paper } from "@mui/material"
import {decode} from 'html-entities';
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addIndex } from "@/store/reducers/playing";
import useQuizAnswer from "@/hooks/useQuizAnswer";

type Props = {
  item?: Quiz
  isNote?: boolean
}

const QuizItem = ({item, isNote}: Props) => {
  const dispatch = useDispatch()

  const {isCorrect, isAnswered, onClickAnswer} = useQuizAnswer({
    item: item,
    isNote: isNote
  })

  const onNext = useCallback(() => {
    dispatch(addIndex())
  }, [dispatch])

  return (
    <Paper sx={{p: 2, m: 2}}>
        <Box sx={{p: 2}}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{decode(item?.category)}</Typography>
          <Typography variant="h5" component="div">{decode(item?.question)}</Typography>
        </Box>
        <Divider />
        <Box sx={{p: 2}}>
          {isAnswered ? 
            <Box sx={{textAlign: 'center'}}>
              <Typography variant="h5" component="div" color={isCorrect? "green" : "red"}>{isCorrect ? '정답' : '오답'}</Typography>
              {isNote ? (
                <>
                  <Typography variant="h5" component="div" >정답은 {item?.correct_answer}입니다</Typography>
                  <Typography variant="h5" component="div" >내가 지난 번에 고른 답 : {item?.select_answer}</Typography>
                </>
              ) : <></>}
              <Button variant="outlined" size="large" onClick={onNext} sx={{m: 2}}>다음 문항</Button>
            </Box>
           : 
            <Grid container spacing={2} sx={{justifyContent: 'center'}}>
              {item?.answers?.map((answer, i) => (
                <Grid item key={i} xs="auto">
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
          }
        </Box>
    </Paper>
  )
}

export default QuizItem