import '@testing-library/jest-dom'
import QuizItem from '@/components/domain/quiz/QuizItem'
import { fireEvent, getByText } from '@testing-library/react'
import { renderWithProviders } from '../src/utils/test-utils'

describe('<QuizItem />', () => {
  const sampleItem = {
    type: 'multiple',
    difficulty: 'medium',
    category: 'TEST CATEGORY',
    question: 'TEST QUESTION',
    correct_answer: 'CORRENT ANSWER',
    incorrect_answers: ['INCORRECT ANSWER 1', 'INCORRECT ANSWER 2', 'INCORRECT ANSWER 3'],
    answers: ['CORRENT ANSWER', 'INCORRECT ANSWER 1', 'INCORRECT ANSWER 2', 'INCORRECT ANSWER 3'],
  }

  const setup = (props = {}) => {
    const initialProps = { item: sampleItem };
    const utils = renderWithProviders(<QuizItem {...initialProps} {...props} />)

    const { getByText } = utils

    const item = props.item || initialProps.item

    const category = getByText(item.category)
    const question = getByText(item.question)
    const answers = item.answers.map(a => getByText(a))

    return {
      ...utils,
      category,
      question,
      answers
    };
  };

  it('matches snapshot', () => {
    const { container } = setup()
    expect(container).toMatchSnapshot();
  });

  it('has category, question, answers', () => {
    const { category, question, answers } = setup()
    expect(category).toBeTruthy()
    expect(question).toBeTruthy()

    for (const answer of answers) {
      expect(answer).toBeTruthy()
    }
  });

  it('click correct answer', () => {
    const { getByText, answers } = setup()
    const correctButton = answers[0]

    fireEvent.click(correctButton)
    getByText('정답')
    getByText('다음 문항')
  });

  it('click incorrect answer', () => {
    const { getByText, answers } = setup()
    const incorrectButton = answers[1]

    fireEvent.click(incorrectButton)
    getByText('오답')
    getByText('다음 문항')
  });
});