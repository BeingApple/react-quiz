import { QuizList } from "@/components/domain/quiz";
import { Box, Container } from "@mui/material";

export default function Home() {


  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: '#cfe8fc', 
          height: '100vh', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center', }} >
        <QuizList/>
      </Box>
    </Container>
  );
}

