import { QuizList } from "@/components/domain/quiz";
import { Box, Container } from "@mui/material";

export default function Home() {


  return (
    <div style={{ display: 'flex' }}>
      <Container maxWidth={false} disableGutters>
        <Box sx={{ bgcolor: '#cfe8fc', 
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', }} >
          <QuizList/>
        </Box>
      </Container>
    </div>
  );
}

