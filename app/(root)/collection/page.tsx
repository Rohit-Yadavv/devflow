import QuestionCard from "@/components/card/QuestionCard";
import Filter from "@/components/share/Filter";
import NoResult from "@/components/share/NoResult";
import Pagination from "@/components/share/Pagination";
import LocalSearchBar from "@/components/share/search/LocalSearchBar";
import { QuestionFilters } from "@/constants/filters";
import { getsavedQuestion } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Collection | Web Overflow",
};

export default async function Page({searchParams}:SearchParamsProps) {
  const { userId } = auth();
  if (!userId) return null;
  const result = await getsavedQuestion({
    clerkId: userId,
    searchQuery:searchParams.q,
    filter:searchParams.filter,
    page:searchParams.page? +searchParams.page: 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="assets/icons/search.svg"
          placeholder="search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions.length > 0 ? (
          result?.questions.map((question:any) => (
            <>
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            </>
          ))
        ) : (
          <NoResult
            title="There are no saved questions to show"
            desc="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <div className="mt-10">
        <Pagination 
          pageNumber={searchParams?.page?+searchParams.page:1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}
