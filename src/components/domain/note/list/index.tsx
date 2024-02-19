import { useSelector } from "react-redux"
import { AppState } from "@/store/reducers"
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import RuleIcon from '@mui/icons-material/Rule';
import { dateToString } from "@/utils/date-utils";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NoteList() {
  const router = useRouter()
  const { noteList } = useSelector((state: AppState) => state.note)

  const goToNote = (index: number) => {
    router.push(`/note/${index}`)
  }

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