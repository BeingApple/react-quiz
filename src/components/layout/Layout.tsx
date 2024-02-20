import { AppState } from "@/store/reducers";
import { hideSnackbar } from "@/store/reducers/snackbar";
import { Box, Container, Snackbar } from "@mui/material";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  children: React.ReactNode
}

export default function Layout({children}: Props) {
  const dispatch = useDispatch()
  const {open, message, onClose} = useSelector((state: AppState) => state.snackbar) 

  const onCloseWithStateChange = useCallback(() => {
    if (onClose !== undefined) {
      onClose()
    }

    dispatch(hideSnackbar())
  }, [onClose, dispatch])

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
        autoHideDuration={1000}
        open={open}
        onClose={onCloseWithStateChange}
        message={message}
      />
    </div>
  );
}

