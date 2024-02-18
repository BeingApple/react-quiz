import { AppState } from "@/store/reducers";
import { Box, Container, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode
}

export default function Layout({children}: Props) {
  const {open, message, onClose} = useSelector((state: AppState) => state.snackbar) 

  return (
    <div style={{ display: 'flex' }}>
      <Container maxWidth={false} disableGutters>
        <Box sx={{ bgcolor: '#cfe8fc', 
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', }} >
          {children}
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        open={open}
        onClose={onClose}
        message={message}
      />
    </div>
  );
}

