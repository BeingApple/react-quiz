import '@testing-library/jest-dom'
import QuizResult from '@/components/domain/quiz/result'
import { durationToString } from "@/utils/date-utils"
import { renderWithProviders } from '../src/utils/test-utils'
import moment from 'moment';

describe('<QuizResult />', () => {
  const sampleItem = {
    type: 'multiple',
    difficulty: 'medium',
    category: 'TEST CATEGORY',
    question: 'TEST QUESTION',
    correct_answer: 'CORRENT ANSWER',
    incorrect_answers: ['INCORRECT ANSWER 1', 'INCORRECT ANSWER 2', 'INCORRECT ANSWER 3'],
    answers: ['CORRENT ANSWER', 'INCORRECT ANSWER 1', 'INCORRECT ANSWER 2', 'INCORRECT ANSWER 3'],
  }

  const sampleResult = {
    startAt: moment('2024-02-19 00:00:00'),
    endAt: moment('2024-02-19 00:01:24'),
    correctList: [sampleItem, sampleItem, sampleItem],
    wrongList: [sampleItem, sampleItem]
  }

  const setup = (props = {}) => {
    const initialProps = sampleResult
    const utils = renderWithProviders(<QuizResult {...initialProps} {...props} />)

    const { getByText } = utils

    const startAt = props.startAt || initialProps.startAt
    const endAt = props.endAt || initialProps.endAt
    const duration = moment.duration(endAt.diff(startAt))
    const timeString = durationToString(duration)
    const correctCount = props.correctList?.length || initialProps.correctList?.length
    const wrongCount = props.wrongList?.length || initialProps.wrongList?.length

    const time = getByText(`소요된 시간 : ${timeString}`)
    const correctCountComponent = getByText(`정답 개수 : ${correctCount}`)
    const wrongCountComponent = getByText(`오답 개수 : ${wrongCount}`)

    return {
      ...utils,
      time,
      correctCountComponent,
      wrongCountComponent
    };
  };

  it('matches snapshot', () => {
    const { container } = setup()
    expect(container).toMatchSnapshot();
  });

  it('has time spent, correct and incorrect count', () => {
    const { time, correctCountComponent, wrongCountComponent } = setup()
    expect(time).toBeTruthy()
    expect(correctCountComponent).toBeTruthy()
    expect(wrongCountComponent).toBeTruthy()
  });
});