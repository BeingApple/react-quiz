import { Quiz } from "@/types/quiz-types"
import { Button, Typography, Card, CardContent, Divider, Box, CardActionArea, Grid } from "@mui/material"
import {decode} from 'html-entities';
import QuizPaper from "../../ui-components/QuizPaper";

type Props = {
  item?: Quiz
  isAnswered: Boolean
  isCorrect?: Boolean
  onClickAnswer: (answer: string) => void
  onNext: () => void
}

const QuizItem = ({item, isAnswered, isCorrect, onClickAnswer, onNext}: Props) => {
  return (
    <QuizPaper>
        <Box sx={{p: 2}}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{decode(item?.category)}</Typography>
          <Typography variant="h5" component="div">{decode(item?.question)}</Typography>
        </Box>
        <Divider />
        <Box sx={{p: 2}}>
          {isAnswered ? (
            <Box sx={{textAlign: 'center'}}>
              <Typography variant="h5" component="div" color={isCorrect? "green" : "red"}>{isCorrect ? '정답' : '오답'}</Typography>
              <Button variant="outlined" size="large" onClick={onNext} sx={{m: 2}}>다음 문제</Button>
            </Box>
          ) : (
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
          )}
        </Box>
    </QuizPaper>
  )
}

export default QuizItem