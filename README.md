## 프로젝트 구성

이 프로젝트는 [Next.js](https://nextjs.org/) 기반, [Pages Router](https://nextjs.org/docs/pages) 를 이용하여 구성되었으며 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 을 통해 생성되었습니다. 

테스트 케이스를 제외한 코드는 TypeScript 로 작성되었으며, 배포는 [Vercel](https://vercel.com)을 통해 [이 곳](https://react-quiz-rose.vercel.app)에 되어 있습니다.

추가적으로 사용한 라이브러리 중 참고하실 사항은 다음과 같습니다.

* axios
* @reduxjs/toolkit
* @tanstack/react-query
* @testing-library
* jest
* html-entities
* moment
* chart.js
* redux-persist
* @mui

## redux

리덕스를 통해 관리되는 상태는 다음과 같습니다.
### Answer
유저가 퀴즈 풀이 도중 응답한 퀴즈가 저장되며, 한 퀴즈 사이클이 완료되면 빈 배열로 초기화됩니다.
```
type State = {
  correctList: Array<Quiz>
  wrongList: Array<Quiz>
}
```
### Note
유저가 퀴즈 풀이를 완료하고 결과를 보면 유저가 퀴즈 풀이 도중 응답한 퀴즈와 함께 자동적으로 오답노트가 저장됩니다.
```
type State = {
  noteList: Array<Note>
}
```
### Playing
유저의 현재 게임 플레이 상태와 시작일자, 종료일자가 기록되며 현재 풀고 있는 퀴즈의 순서가 저장됩니다.
```
type State = {
  status: PlayingStatus
  startAt: Moment | null
  endAt: Moment | null
  index: number
}
```
### Snackbar
스낵바를 노출시킬 수 있는 상태와 보여질 정보와 스낵바가 닫힐 경우의 핸들러가 저장됩니다. 
```
type State = {
  open: boolean
  message?: string
  onClose?: () => void
}
```

## react-query
react-query 를 통해 다음 [공개 API](https://opentdb.com/api_config.php) 에서 호출한 정보를 관리합니다.

```
export const quizQueryKey = ['quiz']

export const quizListQuery = (request?: GetQuizListRequest) => ({
  queryKey: [...quizQueryKey, 'list', request],
  queryFn: () => quizService.getQuizList(request)
})
```
퀴즈의 특성 상 한번 로딩 되면 플레이를 완료할 때 까지 새로운 정보로의 갱신이 필요하지 않으므로 `staleTime: Infinity` 로 설정되었습니다.

## 테스트 케이스

테스트 케이스는 [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) 와 [jest](https://jestjs.io) 를 통해 작성 되었습니다.

### renderWithProviders
테스트를 진행하는 과정에 `redux`, `react-query` 에 대한 Provider 제공을 위해 [Redux - Wrting Test](https://redux.js.org/usage/writing-tests) 를 참고하여 함수를 구성했습니다.

```
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const queryClient = new QueryClient()

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ReduxProvider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
```

### 컴포넌트 재구성
react로 프로젝트를 진행하다보면 항상 얻는 교훈이 있습니다. `상태 설계를 잘하고 진행하자` 입니다.
컴포넌트가 너무 많은 props를 넘겨 받게 되면서 컴포넌트 재사용도 쉬워지지 않았고, 해당 컴포넌트가 넘겨 받은 속성값과 로직대로 잘 출력하는지 테스트 케이스를 만드는 것에도 어려움을 겪어서 중간에 많이 뜯어고쳤습니다...

컴포넌트가 한정된 책임만을 질 수 있도록 가급적 꼭 필요한 속성만 넘겨받도록 재구성 과정을 거쳤습니다. 

### 진행하고 있는 테스트
`/pages/index` 를 테스트 합니다. 기본적으로 `퀴즈`, `오답노트` 로 이동하기 위한 버튼이 존재하는지 확인하며, 오답노트에 관한 state 가 비어있는 상태로 오답노트 버튼을 클릭할 경우 토스트 문구 `아직 오답노트가 없습니다. 문제를 푼 후 다시 와주세요`가 정상적으로 노출되는지 테스트 합니다.

`@/components/domain/quiz/list` 를 테스트 합니다. 요구 사항이었던 `퀴즈 풀기` 버튼이 존재하며 해당 버튼을 누를 수 있는지 테스트 합니다.

`@/components/domain/quiz/QuizItem` 을 테스트 합니다. `QuizItem`의 경우 퀴즈풀이와 오답노트에 재사용되는 컴포넌트이므로 오답노트에서 사용되는 경우와 퀴즈풀이에 사용되는 경우 모두를 대비하여 테스트 케이스를 작성하였습니다.

다음의 더미데이터를 생성해 컴포넌트에 제공합니다.
```
const sampleItem = {
  type: 'multiple',
  difficulty: 'medium',
  category: 'TEST CATEGORY',
  question: 'TEST QUESTION',
  correct_answer: 'CORRENT ANSWER',
  incorrect_answers: ['INCORRECT ANSWER 1', 'INCORRECT ANSWER 2', 'INCORRECT ANSWER 3'],
  answers: ['CORRENT ANSWER', 'INCORRECT ANSWER 1', 'INCORRECT ANSWER 2', 'INCORRECT ANSWER 3'],
}
```
props를 통해 넘겨받은 퀴즈의 카테고리, 질문, 문항이 일치하는지 테스트합니다.
특히 유저가 퀴즈풀이를 진행하면서 정답, 오답으로 설정된 문항 버튼을 각각 클릭했을 때 올바른 정답 여부가 반환되는 것이 중요하다 생각하여 로직대로 나오는지, 다음 문항으로 넘어가기 위한 버튼이 등장하는지 테스트합니다.
오답노트에서 컴포넌트가 활용될 경우 마찬가지 이유로 이전 퀴즈풀이 때 선택했던 문항과 정답이 보이는지 테스트합니다.

`@/components/domain/quiz/result` 를 테스트합니다. 테스트 케이스에서 더미데이터를 손쉽게 넘길 수 있도록 `startAt`, `endAt`, `correctList`, `wrongList` 의 props를 넘겨받도록 컴포넌트를 재구성 하였습니다. 

다음의 더미데이터를 생성해 컴포넌트에 제공합니다. (sampleItem 구성은 위와 같습니다.)
```
const sampleResult = {
  startAt: moment('2024-02-19 00:00:00'),
  endAt: moment('2024-02-19 00:01:24'),
  correctList: [sampleItem, sampleItem, sampleItem],
  wrongList: [sampleItem, sampleItem]
}
```
props를 통해 넘겨받은 시작, 종료시간 차이를 계산하여 나온 `moment.Duration` 을 `durationToString` 유틸 함수를 통해 파싱된 소요 시간만큼 잘 출력되는지, 제공된 정답, 오답 배열의 갯수만큼 정/오답 개수가 반환되는지 테스트합니다. 이 과정에서 아쉽게도 함께 출력하고 있는 `chart.js` 의 그래프 컴포넌트가 잘 나오는지 테스트 해 볼 방법은 찾지 못했습니다. 아는 분들은 알려주시면 감사하겠습니다!

`@/components/domain/note/list` 를 테스트합니다. 유저가 퀴즈풀이를 진행하며 응답했다 가정한 더미데이터를 바탕으로 `2024-02-19 00:00:00` 에 기록된 오답노트를 더미로 생성하여 컴포넌트에 제공합니다.
`dateToString` 유틸 함수를 통해 파싱된 날짜대로 목록이 잘 노출되는지 테스트합니다.

## 소감
일단 이런 경험을 할 수 있게 된 것 자체에 큰 의미가 있다고 생각합니다. 제가 과거보다 성장한 바가 있구나 싶으면서도 역시 배움에는 끝이 없다는 것을 느끼게 되었습니다. 남들이 만들어 놓은 것 위에서 여차저차 따라해보는 것은 그닥 어렵다고 느끼지 않았는데 이렇게 제로투원으로 직접 프로젝트를 작업해보니 생각보다 호락호락하지 않다고 느꼈습니다. 


특히 테스트 케이스를 작성하면서 느낀 바가 많은데요. TDD의 존재를 알면서도 이게 실무에 어떻게 적용할 수 있을지 너무 부차적인 것은 아닌지 가볍게 생각하고 넘겼습니다. 

하지만, [여러 글](https://techblog.woowahan.com/8942/)을 찾아보면서 TDD를 통해 프로젝트의 작동 방식을 보장할 수 있고, 도메인이 복잡해질 수록 잘 만들어진 테스트 케이스가 필요하다는 생각을 했습니다. 또, 테스트 케이스 작동을 고려하다 보니 컴포넌트가 제한적인 책임만을 가지도록 재설계하면서 다시 한번 상태와 컴포넌트 설계를 잘 해야겠다는 생각을 하게 됐고, 다음엔 테스트 케이스를 염두한 프로젝트 설계를 해봐야겠습니다.
감사합니다.