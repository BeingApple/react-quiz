import '@testing-library/jest-dom'
import Home from '../pages/index'
import { fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../src/utils/test-utils'

describe('<Home />', () => {
  it('matches snapshot', () => {
    const utils = renderWithProviders(<Home />);
    expect(utils.container).toMatchSnapshot();
  });

  it('has buttons', () => {
    const utils = renderWithProviders(<Home />)

    utils.getByText('퀴즈 풀기')
    utils.getByText('오답 노트')
  })

  it('click note buttons with empty preloaded state', () => {
    const utils = renderWithProviders(<Home />, {preloadedState: {}})
    const button = utils.getByText('오답 노트')

    fireEvent.click(button)

    utils.findByText('아직 오답노트가 없습니다. 문제를 푼 후 다시 와주세요')
  })
});