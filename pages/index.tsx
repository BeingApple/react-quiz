import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import QuizIcon from '@mui/icons-material/Quiz';
import InboxIcon from '@mui/icons-material/Inbox';
import useCheckEmptyNote from "@/hooks/useCheckEmptyNote";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store/reducers/snackbar";

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const {isEmpty} = useCheckEmptyNote()

  const moveToQuiz = useCallback(() => {
    router.push('/quiz')
  }, [router])

  const moveToNote = useCallback(() => {
    if (!isEmpty) {
      router.push('/note/list')
    } else {
      dispatch(showSnackbar({
        message: '아직 오답노트가 없습니다. 문제를 푼 후 다시 와주세요',
      }))
    }
  }, [isEmpty, router, dispatch])


  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={moveToQuiz}>
            <ListItemIcon>
              <QuizIcon />
            </ListItemIcon>
            <ListItemText primary="퀴즈" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={moveToNote}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="오답노트" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

