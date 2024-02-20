import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/store/reducers"
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import RuleIcon from '@mui/icons-material/Rule';
import { dateToString } from "@/utils/date-utils";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import useCheckEmptyNote from "@/hooks/useCheckEmptyNote";
import { showSnackbar } from "@/store/reducers/snackbar";

export default function NoteList() {
  const router = useRouter()

  const dispatch = useDispatch()
  const { noteList } = useSelector((state: AppState) => state.note)
  const {isEmpty} = useCheckEmptyNote({noteList: noteList})

  const goToNote = (index: number) => {
    router.push(`/note/${index}`)
  }

  const goBackWhenEmptyNote = useCallback(() => {
    if (isEmpty) {
      dispatch(showSnackbar({
        message: '아직 오답노트가 없습니다. 문제를 푼 후 다시 와주세요',
      }))

      router.push(`/`)
    }
  }, [dispatch, isEmpty, router])

  useEffect(() => {
    const timeout = setTimeout(goBackWhenEmptyNote, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [goBackWhenEmptyNote])

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListSubheader>오답노트</ListSubheader>
        {noteList.map((note, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => goToNote(index)}>
              <ListItemIcon>
                <RuleIcon />
              </ListItemIcon>
              <ListItemText primary={`${dateToString(note.recordAt)}의 퀴즈 풀이`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}