import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react'
import QuizList from '@/components/domain/quiz'
import { renderWithProviders } from '../src/utils/test-utils'

describe('<QuizList />', () => {
  it('matches snapshot', () => {
    const utils = renderWithProviders(<QuizList />);
    expect(utils.container).toMatchSnapshot();
  });

  it('shows the first state', () => {
    const utils = renderWithProviders(<QuizList />);
    const startButton = utils.getByText('퀴즈 풀기')

    fireEvent.click(startButton)
  })
});