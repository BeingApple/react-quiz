import '@testing-library/jest-dom'
import Home from '../pages/index'
import { renderWithProviders } from '../src/utils/test-utils'

describe('<Home />', () => {
  it('matches snapshot', () => {
    const utils = renderWithProviders(<Home />);
    expect(utils.container).toMatchSnapshot();
  });

  it('has buttons', () => {
    const utils = renderWithProviders(<Home />)

    utils.getByText('퀴즈')
    utils.getByText('오답노트')
  })
});