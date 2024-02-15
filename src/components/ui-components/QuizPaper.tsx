import { styled } from "@mui/material"
import { Paper } from "@mui/material";

const QuizPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'left',
  minWidth: 500,
}));

export default QuizPaper