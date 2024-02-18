// mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('react-chartjs-2', () => ({
  Pie: () => null
}));