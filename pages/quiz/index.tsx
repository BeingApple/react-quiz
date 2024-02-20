import QuizList from "@/components/domain/quiz/list";
import { quizListQuery } from "@/queries/quiz-queries";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

export default function Quiz() {
  return (
    <QuizList/>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({...quizListQuery()});
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
