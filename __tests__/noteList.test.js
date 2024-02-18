import '@testing-library/jest-dom'
import NoteList from '@/components/domain/note/list'
import { renderWithProviders } from '../src/utils/test-utils'
import moment from 'moment';
import { dateToString } from "@/utils/date-utils";

describe('<NoteList />', () => {
  const sampleItem = {
    type: 'multiple',
    difficulty: 'medium',
    category: 'TEST CATEGORY',
    question: 'TEST QUESTION',
    correct_answer: 'CORRENT ANSWER',
    incorrect_answers: ['INCORRECT ANSWER 1', 'INCORRECT ANSWER 2', 'INCORRECT ANSWER 3'],
    answers: ['CORRENT ANSWER', 'INCORRECT ANSWER 1', 'INCORRECT ANSWER 2', 'INCORRECT ANSWER 3'],
    select_answer: 'INCORRECT ANSWER 2'
  }
  const sampleNote = {
    recordAt: moment('2024-02-19 00:00:00'),
    wrongList: [sampleItem, sampleItem, sampleItem]
  }

  const setup = () => {
    const initialState = { note: {
      noteList: [sampleNote]
    }};
    const utils = renderWithProviders(<NoteList/>, {preloadedState: initialState})
    const { getByText } = utils

    const item = initialState.note.noteList[0]
    const titleString = `${dateToString(item.recordAt)}의 퀴즈 풀이`

    const listTitle = getByText(titleString)

    return {
      ...utils,
      listTitle,
    };
  };

  it('matches snapshot', () => {
    const { container } = setup()
    expect(container).toMatchSnapshot();
  });

  it('has list', () => {
    const { listTitle } = setup()
    expect(listTitle).toBeTruthy()
  });
});